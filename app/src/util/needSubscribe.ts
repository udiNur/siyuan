import {showMessage} from "../dialog/message";
import {getCloudURL} from "../config/util/about";

export const needSubscribe = (tip = window.siyuan.languages._kernel[29]) => {
    // If cloud UI is hidden, bypass subscription checks
    if (window.siyuan.config.system.hideCloudUI) {
        return false;
    }
    
    if (window.siyuan.user && (window.siyuan.user.userSiYuanProExpireTime === -1 || window.siyuan.user.userSiYuanProExpireTime > 0)) {
        return false;
    }
    if (tip) {
        if (tip === window.siyuan.languages._kernel[29] && window.siyuan.config.system.container === "ios") {
            showMessage(window.siyuan.languages._kernel[122]);
        } else {
            if (tip === window.siyuan.languages._kernel[29]) {
                tip = window.siyuan.languages._kernel[29].replaceAll("${accountServer}", getCloudURL(""));
            }
            showMessage(tip);
        }
    }
    return true;
};

export const isPaidUser = () => {
    // If cloud UI is hidden, treat as paid user
    if (window.siyuan.config.system.hideCloudUI) {
        return true;
    }
    return window.siyuan.user && (0 === window.siyuan.user.userSiYuanSubscriptionStatus || 1 === window.siyuan.user.userSiYuanOneTimePayStatus);
};
