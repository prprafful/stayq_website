export const GA_TRACKING_ID = 'G-E9GQ9T0B6F';

export const pageView = (url:URL) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

type GTagEvent = {
    action: string,
    category: string,
    label: string,
    value: number,
}

export const event = ({
    action,
    category,
    label,
    value,
 }: GTagEvent) => {
     window.gtag("event", action, {
         event_category: category,
         event_label: label,
         value,
     });
 };