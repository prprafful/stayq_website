export const GTMPageView = (url: URL) => {
    interface PageEventProps {
        event: string;
        page: URL;
    }

    const pageEvent: PageEventProps = {
        event: 'pageview',
        page: url,
    };
    //@ts-ignore
    window && window.dataLayer && window.dataLayer.push(pageEvent);
    return pageEvent;
};