// Data Migration Script: Firebase → Supabase
// Run with: node migrate-data.js

const admin = require('firebase-admin');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Initialize Supabase Client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Utility: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Batch processor
async function processBatch(items, batchSize, processor) {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await Promise.all(batch.map(processor));
        console.log(`Processed ${Math.min(i + batchSize, items.length)}/${items.length}`);
        await sleep(100); // Rate limiting
    }
}

// =====================================================
// MIGRATE USERS → PROFILES
// =====================================================
async function migrateUsers() {
    console.log('\n📊 Migrating Users → Profiles...');

    try {
        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${users.length} users to migrate`);

        await processBatch(users, 10, async (user) => {
            const profile = {
                id: user.id,
                email: user.email || null,
                full_name: user.displayName || user.full_name || null,
                display_name: user.displayName || null,
                role: user.role || 'creator',
                avatar_url: user.photoURL || user.avatar_url || null,

                // Streak data
                streak_count: user.streak_count || 0,
                streak_points: user.streak_points || 0,
                longest_streak: user.longest_streak || 0,
                last_streak_date: user.last_streak_date?.toDate?.() || null,

                // X/Twitter data
                x_id: user.x_id || null,
                x_username: user.x_username || null,
                x_name: user.x_name || null,
                x_avatar: user.x_avatar || null,
                x_followers_count: user.x_followers_count || 0,
                x_following_count: user.x_following_count || 0,
                x_tweet_count: user.x_tweet_count || 0,
                x_account_created_at: user.x_account_created_at || null,
                x_verified: user.x_verified || false,
                x_location: user.x_location || null,
                x_language: user.x_language || 'en',

                // Analytics
                analytics: user.analytics || {
                    followers: 0,
                    login_count: 0,
                    profile_views: 0,
                    last_login: null
                },
                creator_rank: user.creator_rank || 0,

                // Points
                points: user.points || 0,
                completed_tasks: user.completedTasks || user.completed_tasks || 0,

                // Wallet
                wallet_address: user.walletAddress || user.wallet_address || null,

                // Timestamps
                created_at: user.createdAt?.toDate?.() || new Date(),
                updated_at: user.updatedAt?.toDate?.() || new Date()
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(profile, { onConflict: 'id' });

            if (error) {
                console.error(`Error migrating user ${user.id}:`, error.message);
            }
        });

        console.log('✅ Users migration complete!');
    } catch (error) {
        console.error('❌ Users migration failed:', error);
    }
}

// =====================================================
// MIGRATE ADMINS
// =====================================================
async function migrateAdmins() {
    console.log('\n📊 Migrating Admins...');

    try {
        const adminsSnapshot = await db.collection('admins').get();
        const admins = adminsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${admins.length} admins to migrate`);

        await processBatch(admins, 10, async (admin) => {
            const adminData = {
                id: admin.id,
                email: admin.email,
                permissions: admin.permissions || { all: true },
                created_at: admin.createdAt?.toDate?.() || new Date()
            };

            const { error } = await supabase
                .from('admins')
                .upsert(adminData, { onConflict: 'id' });

            if (error) {
                console.error(`Error migrating admin ${admin.id}:`, error.message);
            }
        });

        console.log('✅ Admins migration complete!');
    } catch (error) {
        console.error('❌ Admins migration failed:', error);
    }
}

// =====================================================
// MIGRATE TASKS
// =====================================================
async function migrateTasks() {
    console.log('\n📊 Migrating Tasks...');

    try {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasks = tasksSnapshot.docs.map(doc => ({
            firebaseId: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${tasks.length} tasks to migrate`);

        const taskIdMap = {}; // Map Firebase IDs to Supabase IDs

        await processBatch(tasks, 10, async (task) => {
            const taskData = {
                title: task.title,
                project_name: task.projectName || task.project_name || null,
                description: task.description,
                instructions: task.instructions || null,
                ai_generated: task.aiGenerated || task.ai_generated || false,
                reward: task.reward,
                campaign_id: task.campaignId || task.campaign_id || 'default',
                type: task.type,
                deadline: task.deadline?.toDate?.() || null,
                status: task.status || 'active',
                category: task.category || null,
                image_url: task.imageUrl || task.image_url || null,
                participants_count: task.participantsCount || task.participants_count || 0,
                created_by: task.createdBy || task.created_by || null,
                created_at: task.createdAt?.toDate?.() || new Date(),
                updated_at: task.updatedAt?.toDate?.() || new Date()
            };

            const { data, error } = await supabase
                .from('tasks')
                .insert(taskData)
                .select()
                .single();

            if (error) {
                console.error(`Error migrating task ${task.firebaseId}:`, error.message);
            } else {
                taskIdMap[task.firebaseId] = data.id;
            }
        });

        console.log('✅ Tasks migration complete!');
        return taskIdMap;
    } catch (error) {
        console.error('❌ Tasks migration failed:', error);
        return {};
    }
}

// =====================================================
// MIGRATE SUBMISSIONS
// =====================================================
async function migrateSubmissions(taskIdMap) {
    console.log('\n📊 Migrating Submissions...');

    try {
        const submissionsSnapshot = await db.collection('taskSubmissions').get();
        const submissions = submissionsSnapshot.docs.map(doc => ({
            firebaseId: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${submissions.length} submissions to migrate`);

        await processBatch(submissions, 10, async (submission) => {
            // Map Firebase task ID to Supabase task ID
            const taskId = taskIdMap[submission.taskId];
            if (!taskId) {
                console.warn(`Skipping submission ${submission.firebaseId}: task not found`);
                return;
            }

            const submissionData = {
                task_id: taskId,
                creator_id: submission.userId || submission.creator_id,
                user_id: submission.userId,
                submission_link: submission.submissionLink || submission.submission_link || null,
                proof_url: submission.proofUrl || submission.proof_url || null,
                proof_link: submission.proofLink || submission.proof_link || null,
                wallet_address: submission.walletAddress || submission.wallet_address || null,
                status: submission.status || 'pending',
                reviewed_at: submission.reviewedAt?.toDate?.() || null,
                reviewed_by: submission.reviewedBy || submission.reviewed_by || null,
                review_comment: submission.reviewComment || submission.review_comment || null,
                submitted_at: submission.createdAt?.toDate?.() || new Date(),
                created_at: submission.createdAt?.toDate?.() || new Date()
            };

            const { error } = await supabase
                .from('submissions')
                .insert(submissionData);

            if (error) {
                console.error(`Error migrating submission ${submission.firebaseId}:`, error.message);
            }
        });

        console.log('✅ Submissions migration complete!');
    } catch (error) {
        console.error('❌ Submissions migration failed:', error);
    }
}

// =====================================================
// MIGRATE CRYPTO NEWS
// =====================================================
async function migrateCryptoNews() {
    console.log('\n📊 Migrating Crypto News...');

    try {
        const newsSnapshot = await db.collection('crypto_news').get();
        const news = newsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${news.length} news items to migrate`);

        await processBatch(news, 10, async (item) => {
            const newsData = {
                id: item.id,
                title: item.title,
                source: item.source,
                url: item.url,
                published_at: item.published_at,
                currencies: item.currencies || [],
                votes: item.votes || {},
                created_at: item.createdAt?.toDate?.() || new Date()
            };

            const { error } = await supabase
                .from('crypto_news')
                .upsert(newsData, { onConflict: 'id' });

            if (error) {
                console.error(`Error migrating news ${item.id}:`, error.message);
            }
        });

        console.log('✅ Crypto news migration complete!');
    } catch (error) {
        console.error('❌ Crypto news migration failed:', error);
    }
}

// =====================================================
// MIGRATE X CONNECTIONS
// =====================================================
async function migrateXConnections() {
    console.log('\n📊 Migrating X Connections...');

    try {
        const connectionsSnapshot = await db.collection('x_connections').get();
        const connections = connectionsSnapshot.docs.map(doc => ({
            x_id: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${connections.length} X connections to migrate`);

        await processBatch(connections, 10, async (connection) => {
            const connectionData = {
                x_id: connection.x_id,
                uid: connection.uid,
                created_at: new Date()
            };

            const { error } = await supabase
                .from('x_connections')
                .upsert(connectionData, { onConflict: 'x_id' });

            if (error) {
                console.error(`Error migrating connection ${connection.x_id}:`, error.message);
            }
        });

        console.log('✅ X connections migration complete!');
    } catch (error) {
        console.error('❌ X connections migration failed:', error);
    }
}

// =====================================================
// MAIN MIGRATION FUNCTION
// =====================================================
async function runMigration() {
    console.log('🚀 Starting Firebase → Supabase Migration...\n');
    console.log('⚠️  WARNING: This will overwrite existing data in Supabase!');
    console.log('⚠️  Make sure you have a backup before proceeding.\n');

    // Uncomment to proceed
    // const readline = require('readline').createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });

    // const answer = await new Promise(resolve => {
    //   readline.question('Type "MIGRATE" to continue: ', resolve);
    // });
    // readline.close();

    // if (answer !== 'MIGRATE') {
    //   console.log('Migration cancelled.');
    //   return;
    // }

    const startTime = Date.now();

    try {
        // Step 1: Migrate users
        await migrateUsers();

        // Step 2: Migrate admins
        await migrateAdmins();

        // Step 3: Migrate tasks (returns ID mapping)
        const taskIdMap = await migrateTasks();

        // Step 4: Migrate submissions (needs task ID mapping)
        await migrateSubmissions(taskIdMap);

        // Step 5: Migrate crypto news
        await migrateCryptoNews();

        // Step 6: Migrate X connections
        await migrateXConnections();

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n✅ Migration completed successfully in ${duration}s!`);

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
    } finally {
        process.exit(0);
    }
}

// Run migration if called directly
if (require.main === module) {
    runMigration();
}

module.exports = {
    migrateUsers,
    migrateAdmins,
    migrateTasks,
    migrateSubmissions,
    migrateCryptoNews,
    migrateXConnections,
    runMigration
};
