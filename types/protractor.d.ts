export const $: any;
export const $$: any;
export class ActionSequence {
    constructor(driver: any);
    driver_: any;
    actions_: any;
    click(opt_elementOrButton: any, opt_button: any): any;
    doubleClick(opt_elementOrButton: any, opt_button: any): any;
    dragAndDrop(element: any, location: any): any;
    keyDown(key: any): any;
    keyUp(key: any): any;
    mouseDown(opt_elementOrButton: any, opt_button: any): any;
    mouseMove(location: any, opt_offset: any): any;
    mouseUp(opt_elementOrButton: any, opt_button: any): any;
    perform(): any;
    scheduleKeyboardAction_(description: any, keys: any): any;
    scheduleMouseAction_(description: any, commandName: any, opt_elementOrButton: any, opt_button: any): any;
    schedule_(description: any, command: any): void;
    sendKeys(var_args: any, ...args: any[]): any;
}
export const Browser: {
    ANDROID: string;
    CHROME: string;
    EDGE: string;
    FIREFOX: string;
    HTMLUNIT: string;
    IE: string;
    INTERNET_EXPLORER: string;
    IPAD: string;
    IPHONE: string;
    OPERA: string;
    PHANTOM_JS: string;
    SAFARI: string;
};
export class Builder {
    log_: any;
    flow_: any;
    url_: any;
    proxy_: any;
    capabilities_: any;
    chromeOptions_: any;
    firefoxOptions_: any;
    operaOptions_: any;
    ieOptions_: any;
    safariOptions_: any;
    edgeOptions_: any;
    ignoreEnv_: any;
    agent_: any;
    build(): any;
    disableEnvironmentOverrides(): any;
    forBrowser(name: any, opt_version: any, opt_platform: any): any;
    getCapabilities(): any;
    getFirefoxOptions(): any;
    getHttpAgent(): any;
    getSafariOptions(): any;
    getServerUrl(): any;
    getWebDriverProxy(): any;
    setAlertBehavior(behavior: any): any;
    setChromeOptions(options: any): any;
    setControlFlow(flow: any): any;
    setEdgeOptions(options: any): any;
    setEnableNativeEvents(enabled: any): any;
    setFirefoxOptions(options: any): any;
    setIeOptions(options: any): any;
    setLoggingPrefs(prefs: any): any;
    setOperaOptions(options: any): any;
    setProxy(config: any): any;
    setSafariOptions(options: any): any;
    setScrollBehavior(behavior: any): any;
    usingHttpAgent(agent: any): any;
    usingServer(url: any): any;
    usingWebDriverProxy(proxy: any): any;
    withCapabilities(capabilities: any): any;
}
export const Button: {
    LEFT: number;
    MIDDLE: number;
    RIGHT: number;
};
export const By: any;
export class Capabilities {
    static android(): any;
    static chrome(): any;
    static edge(): any;
    static firefox(): any;
    static htmlunit(): any;
    static htmlunitwithjs(): any;
    static ie(): any;
    static ipad(): any;
    static iphone(): any;
    static opera(): any;
    static phantomjs(): any;
    static safari(): any;
    constructor(other: any);
    map_: any;
    get(key: any): any;
    has(key: any): any;
    keys(): any;
    merge(other: any): any;
    set(key: any, value: any): any;
    setAlertBehavior(behavior: any): any;
    setEnableNativeEvents(enabled: any): any;
    setLoggingPrefs(prefs: any): any;
    setProxy(proxy: any): any;
    setScrollBehavior(behavior: any): any;
}
export const Capability: {
    ACCEPT_SSL_CERTS: string;
    BROWSER_NAME: string;
    ELEMENT_SCROLL_BEHAVIOR: string;
    HANDLES_ALERTS: string;
    LOGGING_PREFS: string;
    NATIVE_EVENTS: string;
    PLATFORM: string;
    PROXY: string;
    ROTATABLE: string;
    SECURE_SSL: string;
    SUPPORTS_APPLICATION_CACHE: string;
    SUPPORTS_CSS_SELECTORS: string;
    SUPPORTS_JAVASCRIPT: string;
    SUPPORTS_LOCATION_CONTEXT: string;
    TAKES_SCREENSHOT: string;
    UNEXPECTED_ALERT_BEHAVIOR: string;
    VERSION: string;
};
export class Command {
    constructor(name: any);
    name_: any;
    parameters_: any;
    getName(): any;
    getParameter(key: any): any;
    getParameters(): any;
    setParameter(name: any, value: any): any;
    setParameters(parameters: any): any;
}
export const CommandName: {
    ACCEPT_ALERT: string;
    ADD_COOKIE: string;
    CLEAR_APP_CACHE: string;
    CLEAR_ELEMENT: string;
    CLEAR_LOCAL_STORAGE: string;
    CLEAR_SESSION_STORAGE: string;
    CLICK: string;
    CLICK_ELEMENT: string;
    CLOSE: string;
    DELETE_ALL_COOKIES: string;
    DELETE_COOKIE: string;
    DESCRIBE_SESSION: string;
    DISMISS_ALERT: string;
    DOUBLE_CLICK: string;
    ELEMENT_EQUALS: string;
    EXECUTE_ASYNC_SCRIPT: string;
    EXECUTE_SCRIPT: string;
    EXECUTE_SQL: string;
    FIND_CHILD_ELEMENT: string;
    FIND_CHILD_ELEMENTS: string;
    FIND_ELEMENT: string;
    FIND_ELEMENTS: string;
    GET: string;
    GET_ACTIVE_ELEMENT: string;
    GET_ALERT_TEXT: string;
    GET_ALL_COOKIES: string;
    GET_APP_CACHE: string;
    GET_APP_CACHE_STATUS: string;
    GET_AVAILABLE_LOG_TYPES: string;
    GET_COOKIE: string;
    GET_CURRENT_URL: string;
    GET_CURRENT_WINDOW_HANDLE: string;
    GET_ELEMENT_ATTRIBUTE: string;
    GET_ELEMENT_LOCATION: string;
    GET_ELEMENT_LOCATION_IN_VIEW: string;
    GET_ELEMENT_SIZE: string;
    GET_ELEMENT_TAG_NAME: string;
    GET_ELEMENT_TEXT: string;
    GET_ELEMENT_VALUE_OF_CSS_PROPERTY: string;
    GET_LOCAL_STORAGE_ITEM: string;
    GET_LOCAL_STORAGE_KEYS: string;
    GET_LOCAL_STORAGE_SIZE: string;
    GET_LOCATION: string;
    GET_LOG: string;
    GET_PAGE_SOURCE: string;
    GET_SCREEN_ORIENTATION: string;
    GET_SERVER_STATUS: string;
    GET_SESSIONS: string;
    GET_SESSION_LOGS: string;
    GET_SESSION_STORAGE_ITEM: string;
    GET_SESSION_STORAGE_KEYS: string;
    GET_SESSION_STORAGE_SIZE: string;
    GET_TIMEOUT: string;
    GET_TITLE: string;
    GET_WINDOW_HANDLES: string;
    GET_WINDOW_POSITION: string;
    GET_WINDOW_SIZE: string;
    GO_BACK: string;
    GO_FORWARD: string;
    IMPLICITLY_WAIT: string;
    IS_BROWSER_ONLINE: string;
    IS_ELEMENT_DISPLAYED: string;
    IS_ELEMENT_ENABLED: string;
    IS_ELEMENT_SELECTED: string;
    MAXIMIZE_WINDOW: string;
    MOUSE_DOWN: string;
    MOUSE_UP: string;
    MOVE_TO: string;
    NEW_SESSION: string;
    QUIT: string;
    REFRESH: string;
    REMOVE_LOCAL_STORAGE_ITEM: string;
    REMOVE_SESSION_STORAGE_ITEM: string;
    SCREENSHOT: string;
    SEND_KEYS_TO_ACTIVE_ELEMENT: string;
    SEND_KEYS_TO_ELEMENT: string;
    SET_ALERT_CREDENTIALS: string;
    SET_ALERT_TEXT: string;
    SET_BROWSER_ONLINE: string;
    SET_LOCAL_STORAGE_ITEM: string;
    SET_LOCATION: string;
    SET_SCREEN_ORIENTATION: string;
    SET_SCRIPT_TIMEOUT: string;
    SET_SESSION_STORAGE_ITEM: string;
    SET_TIMEOUT: string;
    SET_WINDOW_POSITION: string;
    SET_WINDOW_SIZE: string;
    SUBMIT_ELEMENT: string;
    SWITCH_TO_FRAME: string;
    SWITCH_TO_WINDOW: string;
    TAKE_ELEMENT_SCREENSHOT: string;
    TOUCH_DOUBLE_TAP: string;
    TOUCH_DOWN: string;
    TOUCH_FLICK: string;
    TOUCH_LONG_PRESS: string;
    TOUCH_MOVE: string;
    TOUCH_SCROLL: string;
    TOUCH_SINGLE_TAP: string;
    TOUCH_UP: string;
    UPLOAD_FILE: string;
};
export class ElementArrayFinder {
    constructor(browser_: any, getWebElements: any, locator_: any, actionResults_: any);
    browser_: any;
    getWebElements: any;
    locator_: any;
    actionResults_: any;
    $$(selector: any): any;
    all(locator: any): any;
    allowAnimations(value: any): any;
    applyAction_(actionFn: any): any;
    asElementFinders_(): any;
    clone(): any;
    count(): any;
    each(fn: any): any;
    evaluate(expression: any): any;
    filter(filterFn: any): any;
    first(): any;
    get(index: any): any;
    isPresent(): any;
    last(): any;
    locator(): any;
    map(mapFn: any): any;
    reduce(reduceFn: any, initialValue: any): any;
    then(fn: any, errorFn: any): any;
    toElementFinder_(): any;
}
export class ElementFinder {
    static fromWebElement_(browser: any, webElem: any, locator: any): any;
    constructor(browser_: any, elementArrayFinder: any);
    browser_: any;
    then: any;
    parentElementArrayFinder: any;
    elementArrayFinder_: any;
    $(selector: any): any;
    $$(selector: any): any;
    all(subLocator: any): any;
    allowAnimations(value: any): any;
    clone(): any;
    element(subLocator: any): any;
    equals(element: any): any;
    evaluate(expression: any): any;
    getWebElement(): any;
    isElementPresent(subLocator: any): any;
    isPresent(): any;
    locator(): any;
}
export class EventEmitter {
    addListener(type: any, fn: any, opt_self: any): any;
    addListener_(type: any, fn: any, opt_self: any, opt_oneshot: any): any;
    emit(type: any, var_args: any, ...args: any[]): void;
    listeners(type: any): any;
    on(type: any, fn: any, opt_self: any): any;
    once(type: any, fn: any, opt_self: any): any;
    removeAllListeners(opt_type: any): any;
    removeListener(type: any, listenerFn: any): any;
}
export const ExpectedConditions: any;
export class FileDetector {
    handleFile(driver: any, path: any): any;
}
export namespace Key {
    const ADD: string;
    const ALT: string;
    const ARROW_DOWN: string;
    const ARROW_LEFT: string;
    const ARROW_RIGHT: string;
    const ARROW_UP: string;
    const BACK_SPACE: string;
    const CANCEL: string;
    const CLEAR: string;
    const COMMAND: string;
    const CONTROL: string;
    const DECIMAL: string;
    const DELETE: string;
    const DIVIDE: string;
    const DOWN: string;
    const END: string;
    const ENTER: string;
    const EQUALS: string;
    const ESCAPE: string;
    const F1: string;
    const F10: string;
    const F11: string;
    const F12: string;
    const F2: string;
    const F3: string;
    const F4: string;
    const F5: string;
    const F6: string;
    const F7: string;
    const F8: string;
    const F9: string;
    const HELP: string;
    const HOME: string;
    const INSERT: string;
    const LEFT: string;
    const META: string;
    const MULTIPLY: string;
    const NULL: string;
    const NUMPAD0: string;
    const NUMPAD1: string;
    const NUMPAD2: string;
    const NUMPAD3: string;
    const NUMPAD4: string;
    const NUMPAD5: string;
    const NUMPAD6: string;
    const NUMPAD7: string;
    const NUMPAD8: string;
    const NUMPAD9: string;
    const PAGE_DOWN: string;
    const PAGE_UP: string;
    const PAUSE: string;
    const RETURN: string;
    const RIGHT: string;
    const SEMICOLON: string;
    const SEPARATOR: string;
    const SHIFT: string;
    const SPACE: string;
    const SUBTRACT: string;
    const TAB: string;
    const UP: string;
    function chord(var_args: any, ...args: any[]): any;
}
export class ProtractorBrowser {
    constructor(webdriverInstance: any, opt_baseUrl: any, opt_rootElement: any, opt_untrackOutstandingTimeouts: any, opt_blockingProxyUrl: any);
    driver: any;
    bpClient: any;
    element: any;
    $: any;
    $$: any;
    baseUrl: any;
    getPageTimeout: any;
    params: any;
    resetUrl: any;
    debugHelper: any;
    ready: any;
    trackOutstandingTimeouts_: any;
    mockModules_: any;
    ExpectedConditions: any;
    addBaseMockModules_(): void;
    addMockModule(name: any, script: any, moduleArgs: any): void;
    angularAppRoot(value: any): any;
    clearMockModules(): void;
    controlFlowIsEnabled(): any;
    enterRepl(opt_debugPort: any): any;
    executeAsyncScript_(script: any, description: any, scriptArgs: any): any;
    executeScriptWithDescription(script: any, description: any, scriptArgs: any): any;
    explore(opt_debugPort: any): void;
    findElement(locator: any): any;
    findElements(locator: any): any;
    forkNewDriverInstance(useSameUrl: any, copyMockModules: any, copyConfigUpdates: any): any;
    get(destination: any, timeout: any): any;
    getLocationAbsUrl(): any;
    getProcessedConfig(): any;
    getRegisteredMockModules(): any;
    isElementPresent(locatorOrElement: any): any;
    navigate(): any;
    pause(opt_debugPort: any): any;
    refresh(opt_timeout: any): any;
    removeMockModule(name: any): void;
    restart(): void;
    restartSync(): void;
    setLocation(url: any): any;
    useAllAngular2AppRoots(): void;
    waitForAngular(opt_description: any): any;
    waitForAngularEnabled(enabled: any): any;
}
export namespace ProtractorBrowser {
    const By: {
        addLocator: Function;
        binding: Function;
        buttonText: Function;
        byRepeaterInner: Function;
        className: Function;
        css: Function;
        cssContainingText: Function;
        deepCss: Function;
        exactBinding: Function;
        exactRepeater: Function;
        id: Function;
        js: Function;
        linkText: Function;
        model: Function;
        name: Function;
        options: Function;
        partialButtonText: Function;
        partialLinkText: Function;
        repeater: Function;
        tagName: Function;
        xpath: Function;
    };
}
export class ProtractorBy {
    addLocator(name: any, script: any): void;
    binding(bindingDescriptor: any): any;
    buttonText(searchText: any): any;
    byRepeaterInner(exact: any, repeatDescriptor: any): any;
    cssContainingText(cssSelector: any, searchText: any): any;
    deepCss(selector: any): any;
    exactBinding(bindingDescriptor: any): any;
    exactRepeater(repeatDescriptor: any): any;
    model(model: any): any;
    options(optionsDescriptor: any): any;
    partialButtonText(searchText: any): any;
    repeater(repeatDescriptor: any): any;
}
export class ProtractorExpectedConditions {
    constructor(browser: any);
    browser: any;
    alertIsPresent(): any;
    and(args: any): any;
    elementToBeClickable(elementFinder: any): any;
    elementToBeSelected(elementFinder: any): any;
    invisibilityOf(elementFinder: any): any;
    logicalChain_(defaultRet: any, fns: any): any;
    not(expectedCondition: any): any;
    or(args: any): any;
    presenceOf(elementFinder: any): any;
    stalenessOf(elementFinder: any): any;
    textToBePresentInElement(elementFinder: any, text: any): any;
    textToBePresentInElementValue(elementFinder: any, text: any): any;
    titleContains(title: any): any;
    titleIs(title: any): any;
    urlContains(url: any): any;
    urlIs(url: any): any;
    visibilityOf(elementFinder: any): any;
}
export class Ptor {
    $: any;
    $$: any;
    ProtractorBrowser: any;
    ElementFinder: any;
    ElementArrayFinder: any;
    ProtractorBy: any;
    ProtractorExpectedConditions: any;
    ActionSequence: any;
    Browser: any;
    Builder: any;
    Button: any;
    Capabilities: any;
    Capability: any;
    EventEmitter: any;
    FileDetector: any;
    Key: any;
    Session: any;
    WebDriver: any;
    WebElement: any;
    WebElementPromise: any;
    error: any;
    logging: any;
    promise: any;
    until: any;
    Command: any;
    CommandName: any;
    utils: any;
}
export class Runner {
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    constructor(config: any);
    exit_: any;
    config_: any;
    ready_: any;
    addListener(type: any, listener: any): any;
    afterEach(): any;
    controlFlow(): any;
    createBrowser(plugins: any, parentBrowser: any): any;
    emit(type: any, args: any): any;
    eventNames(): any;
    getConfig(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    loadDriverProvider_(config: any): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    run(): any;
    runTestPreparer(extraFlags: any): any;
    setMaxListeners(n: any): any;
    setTestPreparer(filenameOrFn: any): void;
    setupGlobals_(browser_: any): void;
    shutdown_(): any;
}
export namespace Runner {
    class EventEmitter {
        // Circular reference from index.Runner.EventEmitter
        static EventEmitter: any;
        static defaultMaxListeners: any;
        static init(): void;
        static listenerCount(emitter: any, type: any): any;
        static usingDomains: boolean;
        addListener(type: any, listener: any): any;
        emit(type: any, args: any): any;
        eventNames(): any;
        getMaxListeners(): any;
        listenerCount(type: any): any;
        listeners(type: any): any;
        off(type: any, listener: any): any;
        on(type: any, listener: any): any;
        once(type: any, listener: any): any;
        prependListener(type: any, listener: any): any;
        prependOnceListener(type: any, listener: any): any;
        rawListeners(type: any): any;
        removeAllListeners(type: any, ...args: any[]): any;
        removeListener(type: any, listener: any): any;
        setMaxListeners(n: any): any;
    }
}
export class Session {
    constructor(id: any, capabilities: any);
    id_: any;
    caps_: any;
    getCapabilities(): any;
    getCapability(key: any): any;
    getId(): any;
    toJSON(): any;
}
export class WebDriver {
    static attachToSession(executor: any, sessionId: any, opt_flow: any): any;
    static createSession(executor: any, capabilities: any, opt_flow: any, opt_onQuit: any): any;
    constructor(session: any, executor: any, opt_flow: any, opt_onQuit: any);
    flow_: any;
    session_: any;
    executor_: any;
    fileDetector_: any;
    onQuit_: any;
    actions(): any;
    call(fn: any, opt_scope: any, var_args: any, ...args: any[]): any;
    close(): any;
    controlFlow(): any;
    executeAsyncScript(script: any, var_args: any, ...args: any[]): any;
    executeScript(script: any, var_args: any, ...args: any[]): any;
    findElement(locator: any): any;
    findElementInternal_(locatorFn: any, context: any): any;
    findElements(locator: any): any;
    findElementsInternal_(locatorFn: any, context: any): any;
    get(url: any): any;
    getAllWindowHandles(): any;
    getCapabilities(): any;
    getCurrentUrl(): any;
    getExecutor(): any;
    getPageSource(): any;
    getSession(): any;
    getTitle(): any;
    getWindowHandle(): any;
    manage(): any;
    navigate(): any;
    quit(): any;
    schedule(command: any, description: any): any;
    setFileDetector(detector: any): void;
    sleep(ms: any): any;
    switchTo(): any;
    takeScreenshot(): any;
    touchActions(): any;
    wait(condition: any, opt_timeout: any, opt_message: any): any;
}
export class WebElement {
    static buildId(id: any, opt_noLegacy: any): any;
    static equals(a: any, b: any): any;
    static extractId(obj: any): any;
    static isId(obj: any): any;
    constructor(driver: any, id: any);
    driver_: any;
    id_: any;
    clear(): any;
    click(): any;
    findElement(locator: any): any;
    findElements(locator: any): any;
    getAttribute(attributeName: any): any;
    getCssValue(cssStyleProperty: any): any;
    getDriver(): any;
    getId(): any;
    getLocation(): any;
    getSize(): any;
    getTagName(): any;
    getText(): any;
    isDisplayed(): any;
    isEnabled(): any;
    isSelected(): any;
    schedule_(command: any, description: any): any;
    sendKeys(var_args: any, ...args: any[]): any;
    submit(): any;
    takeScreenshot(opt_scroll: any): any;
}
export class WebElementPromise {
    static buildId(id: any, opt_noLegacy: any): any;
    static equals(a: any, b: any): any;
    static extractId(obj: any): any;
    static isId(obj: any): any;
    constructor(driver: any, el: any);
    cancel: any;
    then: any;
    catch: any;
    getId(): any;
    clear(): any;
    click(): any;
    findElement(locator: any): any;
    findElements(locator: any): any;
    getAttribute(attributeName: any): any;
    getCssValue(cssStyleProperty: any): any;
    getDriver(): any;
    getLocation(): any;
    getSize(): any;
    getTagName(): any;
    getText(): any;
    isDisplayed(): any;
    isEnabled(): any;
    isSelected(): any;
    schedule_(command: any, description: any): any;
    sendKeys(var_args: any, ...args: any[]): any;
    submit(): any;
    takeScreenshot(opt_scroll: any): any;
}
export const browser: any;
export const by: any;
export const element: any;
export namespace error {
    class ElementNotInteractableError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class ElementNotSelectableError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class ElementNotVisibleError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    const ErrorCode: {
        ELEMENT_NOT_SELECTABLE: number;
        ELEMENT_NOT_VISIBLE: number;
        IME_ENGINE_ACTIVATION_FAILED: number;
        IME_NOT_AVAILABLE: number;
        INVALID_COOKIE_DOMAIN: number;
        INVALID_ELEMENT_COORDINATES: number;
        INVALID_ELEMENT_STATE: number;
        INVALID_SELECTOR_ERROR: number;
        INVALID_XPATH_SELECTOR: number;
        INVALID_XPATH_SELECTOR_RETURN_TYPE: number;
        JAVASCRIPT_ERROR: number;
        METHOD_NOT_ALLOWED: number;
        MOVE_TARGET_OUT_OF_BOUNDS: number;
        NO_SUCH_ALERT: number;
        NO_SUCH_ELEMENT: number;
        NO_SUCH_FRAME: number;
        NO_SUCH_WINDOW: number;
        SCRIPT_TIMEOUT: number;
        SESSION_NOT_CREATED: number;
        SQL_DATABASE_ERROR: number;
        STALE_ELEMENT_REFERENCE: number;
        SUCCESS: number;
        TIMEOUT: number;
        UNABLE_TO_SET_COOKIE: number;
        UNEXPECTED_ALERT_OPEN: number;
        UNKNOWN_COMMAND: number;
        UNKNOWN_ERROR: number;
        UNSUPPORTED_OPERATION: number;
        XPATH_LOOKUP_ERROR: number;
    };
    class InvalidArgumentError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class InvalidCookieDomainError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class InvalidElementCoordinatesError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class InvalidElementStateError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class InvalidSelectorError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class JavascriptError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class MoveTargetOutOfBoundsError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class NoSuchAlertError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class NoSuchElementError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class NoSuchFrameError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class NoSuchSessionError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class NoSuchWindowError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class ScriptTimeoutError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class SessionNotCreatedError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class StaleElementReferenceError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class TimeoutError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class UnableToCaptureScreenError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class UnableToSetCookieError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class UnexpectedAlertOpenError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any, opt_text: any);
        text_: any;
        getAlertText(): any;
    }
    class UnknownCommandError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class UnknownMethodError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class UnsupportedOperationError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
    }
    class WebDriverError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(opt_error: any);
        name: any;
        remoteStacktrace: any;
    }
    function checkLegacyResponse(responseObj: any): any;
    function checkResponse(data: any): any;
    function encodeError(err: any): any;
    function isErrorResponse(data: any): any;
    function throwDecodedError(data: any): void;
}
export namespace logging {
    class Entry {
        constructor(level: any, message: any, opt_timestamp: any, opt_type: any);
        level: any;
        message: any;
        timestamp: any;
        type: any;
        toJSON(): any;
    }
    class Level {
        static ALL: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static DEBUG: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static FINE: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static FINER: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static FINEST: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static INFO: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static OFF: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static SEVERE: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        static WARNING: {
            name: any;
            name_: string;
            value: any;
            value_: number;
        };
        constructor(name: any, level: any);
        name_: any;
        value_: any;
    }
    class LogManager {
        loggers_: any;
        root_: any;
        createLogger_(name: any, parent: any): any;
        getLogger(name: any): any;
    }
    class Logger {
        constructor(name: any, opt_level: any);
        name_: any;
        level_: any;
        parent_: any;
        handlers_: any;
        addHandler(handler: any): void;
        debug(loggable: any): void;
        fine(loggable: any): void;
        finer(loggable: any): void;
        finest(loggable: any): void;
        getEffectiveLevel(): any;
        getLevel(): any;
        getName(): any;
        info(loggable: any): void;
        isLoggable(level: any): any;
        log(level: any, loggable: any): void;
        removeHandler(handler: any): any;
        setLevel(level: any): void;
        severe(loggable: any): void;
        warning(loggable: any): void;
    }
    class Preferences {
        prefs_: any;
        setLevel(type: any, level: any): void;
        toJSON(): any;
    }
    const Type: {
        BROWSER: string;
        CLIENT: string;
        DRIVER: string;
        PERFORMANCE: string;
        SERVER: string;
    };
    function addConsoleHandler(opt_logger: any): void;
    function getLevel(nameOrValue: any): any;
    function getLogger(name: any): any;
    function installConsoleHandler(): void;
    function removeConsoleHandler(opt_logger: any): void;
}
export namespace promise {
    class CancellableThenable {
        static addImplementation(ctor: any): void;
        static isImplementation(object: any): any;
        cancel(opt_reason: any): void;
    }
    class CancellationError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        static wrap(error: any, opt_msg: any): any;
        constructor(opt_msg: any);
        name: any;
        silent_: any;
    }
    class ControlFlow {
        static EventType: {
            IDLE: string;
            RESET: string;
            SCHEDULE_TASK: string;
            UNCAUGHT_EXCEPTION: string;
        };
        propagateUnhandledRejections_: any;
        activeQueue_: any;
        taskQueues_: any;
        shutdownTask_: any;
        hold_: any;
        addListener(type: any, fn: any, opt_self: any): any;
        addListener_(type: any, fn: any, opt_self: any, opt_oneshot: any): any;
        async(fn: any, opt_self: any, var_args: any): void;
        cancelHold_(): void;
        cancelQueues_(reason: any): void;
        cancelShutdown_(): void;
        emit(type: any, var_args: any, ...args: any[]): void;
        execute(fn: any, opt_description: any): any;
        getActiveQueue_(): any;
        getSchedule(opt_includeStackTraces: any): any;
        isIdle(): any;
        listeners(type: any): any;
        on(type: any, fn: any, opt_self: any): any;
        onQueueEnd_(q: any): void;
        onQueueError_(error: any, q: any): void;
        once(type: any, fn: any, opt_self: any): any;
        promise(resolver: any): any;
        removeAllListeners(opt_type: any): any;
        removeListener(type: any, listenerFn: any): any;
        reportUncaughtException_(e: any): void;
        reset(): void;
        setPropagateUnhandledRejections(propagate: any): void;
        shutdown_(): void;
        timeout(ms: any, opt_description: any): any;
        wait(condition: any, opt_timeout: any, opt_message: any): any;
    }
    class Deferred {
        constructor(opt_flow: any, opt_skipLog: any);
        promise: any;
        resolve: any;
        fulfill: any;
        reject: any;
    }
    const LONG_STACK_TRACES: any;
    class MultipleUnhandledRejectionError {
        static captureStackTrace(p0: any, p1: any): any;
        static stackTraceLimit: number;
        constructor(errors: any);
        name: any;
        errors: any;
    }
    class Promise {
        static reject(opt_reason: any): any;
        static resolve(opt_value: any): any;
        constructor(resolver: any, opt_flow: any, opt_skipLog: any);
        flow_: any;
        stack_: any;
        parent_: any;
        callbacks_: any;
        state_: any;
        handled_: any;
        value_: any;
        queue_: any;
        addCallback_(callback: any, errback: any, name: any, fn: any): any;
        cancel(opt_reason: any): void;
        invokeCallback_(callback: any, errback: any): any;
        invokeThen_(x: any, then: any): void;
        resolve_(newState: any, newValue: any): void;
        scheduleNotifications_(): void;
        then(opt_callback: any, opt_errback: any): any;
        unblockAndResolve_(newState: any, newValue: any): void;
    }
    function Resolver(): void;
    class Scheduler {
        execute(fn: any, opt_description: any): void;
        promise(resolver: any): void;
        timeout(ms: any, opt_description: any): void;
        wait(condition: any, opt_timeout: any, opt_message: any): void;
    }
    class Thenable {
        static addImplementation(ctor: any): void;
        static isImplementation(object: any): any;
        then(opt_callback: any, opt_errback: any): void;
    }
    const USE_PROMISE_MANAGER: any;
    function all(arr: any): any;
    function asap(value: any, callback: any, opt_errback: any): void;
    function captureStackTrace(name: any, msg: any, opt_topFn: any): any;
    function checkedNodeCall(fn: any, var_args: any, ...args: any[]): any;
    function consume(generatorFn: any, opt_self: any, var_args: any): any;
    function controlFlow(): any;
    function createFlow(callback: any): any;
    function createPromise(resolver: any): any;
    function defer(): any;
    function delayed(ms: any): any;
    function filter(arr: any, fn: any, opt_self: any): any;
    function fulfilled(opt_value: any): any;
    function fullyResolved(value: any): any;
    function isGenerator(fn: any): any;
    function isPromise(value: any): any;
    function map(arr: any, fn: any, opt_self: any): any;
    function rejected(opt_reason: any): any;
    function setDefaultFlow(flow: any): void;
    function when(value: any, opt_callback: any, opt_errback: any): any;
}
export const protractor: any;
export namespace until {
    function ableToSwitchToFrame(frame: any): any;
    function alertIsPresent(): any;
    function elementIsDisabled(element: any): any;
    function elementIsEnabled(element: any): any;
    function elementIsNotSelected(element: any): any;
    function elementIsNotVisible(element: any): any;
    function elementIsSelected(element: any): any;
    function elementIsVisible(element: any): any;
    function elementLocated(locator: any): any;
    function elementTextContains(element: any, substr: any): any;
    function elementTextIs(element: any, text: any): any;
    function elementTextMatches(element: any, regex: any): any;
    function elementsLocated(locator: any): any;
    function stalenessOf(element: any): any;
    function titleContains(substr: any): any;
    function titleIs(title: any): any;
    function titleMatches(regex: any): any;
    function urlContains(substrUrl: any): any;
    function urlIs(url: any): any;
    function urlMatches(regex: any): any;
}
export const utils: {
    firefox: {
        Binary: Function;
        Channel: Function;
        Context: {
            CHROME: string;
            CONTENT: string;
        };
        Driver: Function;
        Options: Function;
        Profile: Function;
        ServiceBuilder: Function;
    };
    http: {
        Executor: Function;
        HttpClient: Function;
        Request: Function;
        Response: Function;
    };
    remote: {
        DriverService: Function;
        FileDetector: Function;
        SeleniumServer: Function;
        ServiceOptions: Function;
    };
};
