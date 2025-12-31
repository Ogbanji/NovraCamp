# Novra Admin Dashboard - API Reference

## Base URL

```
https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
```

Replace `YOUR-PROJECT-ID` with your actual Firebase project ID.

---

## Authentication

All admin endpoints require Firebase Auth token in the Authorization header:

```
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

Get token in frontend:
```typescript
const user = auth.currentUser;
const token = await user.getIdToken();
```

---

## Admin Endpoints

### 📊 Get Statistics

**GET** `/api/admin/stats`

Returns dashboard statistics.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "stats": {
    "totalTasks": 10,
    "activeTasks": 8,
    "totalUsers": 150,
    "totalSubmissions": 45,
    "pendingSubmissions": 12,
    "approvedSubmissions": 30,
    "rejectedSubmissions": 3
  }
}
```

---

### ✅ Create Task

**POST** `/api/admin/tasks`

Creates a new task with AI-generated description and instructions.

**Headers:**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Follow us on Twitter",
  "description": "Follow our official Twitter account",
  "reward": 100,
  "campaignId": "summer2024",
  "type": "social"
}
```

**Required Fields:**
- `title` (string)
- `reward` (number)
- `type` (string): "social" | "wallet" | "referral" | "custom"

**Optional Fields:**
- `description` (string) - AI will enhance this
- `campaignId` (string) - default: "default"

**Response:**
```json
{
  "message": "Task created successfully",
  "taskId": "abc123",
  "task": {
    "title": "Follow us on Twitter",
    "description": "Enhanced AI description...",
    "instructions": "1. Go to Twitter...",
    "reward": 100,
    "campaignId": "summer2024",
    "type": "social",
    "status": "active",
    "aiGenerated": true,
    "createdAt": "...",
    "createdBy": "admin_uid",
    "updatedAt": "..."
  }
}
```

**Email Notification:**
All admins receive an email with task details.

---

### ✏️ Update Task

**PUT** `/api/admin/tasks/:taskId`

Updates an existing task.

**Headers:**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

**Body:** (all fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "reward": 150,
  "status": "inactive"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "taskId": "abc123"
}
```

---

### 🗑️ Delete Task

**DELETE** `/api/admin/tasks/:taskId`

Deletes a task.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "message": "Task deleted successfully",
  "taskId": "abc123"
}
```

---

### 📋 Get Submissions

**GET** `/api/admin/submissions`

Retrieves task submissions with user and task details.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Query Parameters:**
- `status` (optional): "pending" | "approved" | "rejected"
- `limit` (optional): number (default: 50)

**Example:**
```
GET /api/admin/submissions?status=pending&limit=20
```

**Response:**
```json
{
  "submissions": [
    {
      "id": "sub123",
      "userId": "user456",
      "taskId": "task789",
      "walletAddress": "0x1234...",
      "proofUrl": "https://...",
      "proofImage": "https://...",
      "status": "pending",
      "createdAt": "...",
      "user": {
        "displayName": "John Doe",
        "twitterHandle": "johndoe",
        "email": "john@example.com"
      },
      "task": {
        "title": "Follow us on Twitter",
        "reward": 100
      }
    }
  ]
}
```

---

### ✅ Approve Submission

**POST** `/api/admin/submissions/:submissionId/approve`

Approves a submission and awards points to the user.

**Headers:**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

**Body:** (optional)
```json
{
  "comment": "Great job!"
}
```

**Response:**
```json
{
  "message": "Submission approved and points awarded",
  "points": 100,
  "submissionId": "sub123"
}
```

**Side Effects:**
- Submission status → "approved"
- User points increased by task reward
- User completedTasks incremented
- Email notification sent to admins

---

### ❌ Reject Submission

**POST** `/api/admin/submissions/:submissionId/reject`

Rejects a submission.

**Headers:**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

**Body:** (optional)
```json
{
  "comment": "Proof not valid"
}
```

**Response:**
```json
{
  "message": "Submission rejected",
  "submissionId": "sub123"
}
```

**Side Effects:**
- Submission status → "rejected"
- reviewComment saved

---

## Public/User Endpoints

### 🐦 Twitter OAuth

**POST** `/auth/twitter/callback`

Exchanges Twitter authorization code for access token.

**Body:**
```json
{
  "code": "twitter_auth_code",
  "codeVerifier": "pkce_verifier",
  "redirectUri": "https://yourapp.com/callback"
}
```

**Response:**
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 7200,
  "token_type": "bearer"
}
```

---

### 👤 Get Twitter Profile

**GET** `/api/twitter/me`

Fetches authenticated user's Twitter profile.

**Headers:**
```
Authorization: Bearer <TWITTER_ACCESS_TOKEN>
```

**Response:**
```json
{
  "user": {
    "id": "123456789",
    "name": "John Doe",
    "username": "johndoe",
    "profile_image_url": "https://...",
    "verified": false,
    "public_metrics": {
      "followers_count": 1000,
      "following_count": 500
    }
  }
}
```

---

## Firestore Triggers

These run automatically - no API calls needed.

### 📬 On Task Submission

**Trigger:** `taskSubmissions/{submissionId}` onCreate

**Action:**
- Fetches user and task details
- Sends email notification to all admins
- Includes submission proof link

**Email Template:**
```
Subject: [Novra] TASK_COMPLETED

A user has completed a task and is awaiting approval:
- User: @johndoe
- Task: Follow us on Twitter
- Wallet: 0x1234...
- Submitted: [timestamp]
```

---

## Error Responses

All endpoints may return these error codes:

### 400 Bad Request
```json
{
  "message": "Missing required parameters"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized: No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden: Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Submission not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to create task",
  "error": "Detailed error message"
}
```

---

## Rate Limits

Firebase Functions have default limits:
- 1000 invocations/sec
- 10 concurrent executions (Spark plan)
- 100 concurrent executions (Blaze plan)

Consider implementing rate limiting for production.

---

## Example Frontend Usage

### Creating a Task

```typescript
const createTask = async (taskData) => {
  const user = auth.currentUser;
  const token = await user.getIdToken();

  const response = await fetch(
    `${process.env.VITE_FIREBASE_FUNCTIONS_URL}/api/admin/tasks`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return await response.json();
};
```

### Approving a Submission

```typescript
const approveSubmission = async (submissionId, comment) => {
  const user = auth.currentUser;
  const token = await user.getIdToken();

  const response = await fetch(
    `${process.env.VITE_FIREBASE_FUNCTIONS_URL}/api/admin/submissions/${submissionId}/approve`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to approve submission');
  }

  return await response.json();
};
```

---

## Security Best Practices

1. **Always validate tokens on backend**
   - Never trust client-side admin checks
   - Verify against Firestore admins collection

2. **Use HTTPS only**
   - Firebase Functions are HTTPS by default
   - Never disable SSL in production

3. **Sanitize inputs**
   - Validate all request data
   - Prevent NoSQL injection

4. **Monitor logs**
   - Check for unauthorized access attempts
   - Set up alerts for suspicious activity

5. **Rate limiting**
   - Implement per-user rate limits
   - Prevent abuse of expensive operations (AI)

---

## Testing with cURL

### Get Stats
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://us-central1-PROJECT-ID.cloudfunctions.net/api/api/admin/stats
```

### Create Task
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","reward":100,"type":"social"}' \
  https://us-central1-PROJECT-ID.cloudfunctions.net/api/api/admin/tasks
```

---

## Postman Collection

Import this JSON to Postman for easy testing:

```json
{
  "info": {
    "name": "Novra Admin API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{firebase_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api"
    }
  ]
}
```

---

For more information, see [ADMIN_DASHBOARD_SETUP.md](./ADMIN_DASHBOARD_SETUP.md)
