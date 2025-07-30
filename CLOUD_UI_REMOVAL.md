# SiYuan Cloud UI Removal

This document describes the cloud UI removal feature that hides all account, subscription, and cloud sync related UI elements in SiYuan.

## Implementation

The feature is controlled by the `hideCloudUI` boolean flag in the system configuration (`window.siyuan.config.system.hideCloudUI`).

### What gets hidden when `hideCloudUI` is enabled:

1. **Settings Page (Desktop & Mobile)**
   - Account section is hidden
   - Cloud/Repos section is hidden

2. **Mobile Menu**
   - Account menu item is hidden
   - Cloud sync menu items are hidden

3. **Desktop Topbar**
   - Sync button is hidden
   - VIP/subscription toolbar elements are hidden

4. **Subscription System**
   - `needSubscribe()` always returns `false` (bypasses subscription checks)
   - `isPaidUser()` always returns `true` (treats user as paid)
   - Trial prompts are suppressed
   - Sync guide dialogs are prevented

## Configuration

The flag is defined in the TypeScript configuration interface (`app/src/types/config.d.ts`):

```typescript
export interface ISystem {
    // ... other properties
    /**
     * Whether to hide cloud/account UI elements (for development builds)
     */
    hideCloudUI: boolean;
}
```

## Backend Integration

To enable this feature, the backend needs to:

1. Add `hideCloudUI` field to the system configuration structure
2. Default the value to `true` for development builds and `false` for production
3. Expose this setting through the configuration API

## Development Usage

For development builds, this flag should be set to `true` by default to hide all cloud-related UI elements, making the application suitable for self-hosted or offline usage without any references to SiYuan Cloud services.

## Files Modified

- `app/src/types/config.d.ts` - Added hideCloudUI type definition
- `app/src/config/index.ts` - Hide account/cloud sections in settings
- `app/src/mobile/menu/index.ts` - Hide account/sync menu items
- `app/src/mobile/settings/account.ts` - Protected menuAccount references
- `app/src/layout/topBar.ts` - Hide sync button and VIP toolbar
- `app/src/config/account.ts` - Respect hideCloudUI in onSetaccount
- `app/src/util/needSubscribe.ts` - Bypass subscription checks
- `app/src/sync/syncGuide.ts` - Prevent sync guide when cloud UI hidden