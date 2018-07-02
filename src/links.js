// @flow

const streamrRoot = process.env.STREAMR_URL || ''

module.exports = {
    streamrSite: streamrRoot,
    login: '/login/auth',
    signup: '/register/signup',
    whitepaper: '/whitepaper',
    newCanvas: '/canvas/editor',
    canvasList: '/canvas/list',
    dashboardList: '/dashboard/list',
    dashboardEditor: '/dashboard/editor',
    streamList: '/stream/list',
    streamCreate: '/stream/create',
    profile: '/profile/edit',
    logout: '/logout',
    // <---- These don't exist in local Streamr
    marketplace: 'https://www.streamr.com/marketplace',
    faq: 'https://www.streamr.com/faq',
    aboutUs: 'https://www.streamr.com/about',
    howItWorks: 'https://www.streamr.com#howItWorks',
    streamrSystem: 'https://www.streamr.com#streamrSystem',
    tryTheEditor: 'https://www.streamr.com#tryTheEditor',
    contributionSummary: 'https://s3.amazonaws.com/streamr-public/Crowdcontribution+Information+Summary+(20170912).pdf',
    publisherTerms: 'https://s3.amazonaws.com/streamr-public/streamr-data-provider-agreement.pdf',
    allowanceInfo: 'https://tokenallowance.io',
    // ---->
    blog: 'https://medium.com/streamrblog',
    main: '/',
    internalLogin: '/login',
    products: '/products',
    account: '/account',
    myProducts: '/account/products',
    myPurchases: '/account/purchases',
    createProduct: '/account/products/create',
    createProductPreview: '/account/products/preview',
    community: {
        trello: 'https://trello.com/b/j24hxvjg/streamr-milestone-1',
        rocket: 'https://chat.streamr.com',
        telegram: 'https://t.me/streamrdata',
        reddit: 'https://reddit.com/r/streamr',
        twitter: 'https://twitter.com/streamrinc',
        linkedin: 'https://www.linkedin.com/company/streamr-ltd-/',
        youtube: 'https://www.youtube.com/channel/UCGWEA61RueG-9DV53s-ZyJQ',
        medium: 'https://medium.com/streamrblog',
        github: 'https://github.com/streamr-dev',
    },
    contact: {
        general: 'mailto:contact@streamr.com',
        media: 'mailto:media@streamr.com',
        jobs: 'mailto:jobs@streamr.com',
        labs: 'mailto:labs@streamr.com',
    },
}

