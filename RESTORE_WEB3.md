# Quick Reference - Restoring Web3 Functionality

## Install All Missing Web3 Dependencies

Run this single command to install all required Web3 packages:

```bash
npm install wagmi @reown/appkit @reown/appkit-adapter-wagmi @reown/appkit/networks @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/wallet-adapter-base @solana/web3.js @tonconnect/ui-react
```

## After Installation

1. The commented code in these files will work automatically:
   - `src/providers/Web3Provider.tsx`
   - `src/components/WalletConnect.tsx`
   - `src/config/web3.ts`

2. Uncomment the code in those files to restore full functionality

3. Rebuild and redeploy:
```bash
npm run build
firebase deploy --only hosting
```

## Files Modified for Deployment

These files have temporary simplifications:
- ✅ `src/providers/Web3Provider.tsx` - Simplified to pass-through
- ✅ `src/components/WalletConnect.tsx` - Shows placeholder
- ✅ `src/config/web3.ts` - Placeholder exports

Original implementations are preserved in comments within each file.
