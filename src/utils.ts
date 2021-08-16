export const UrlParse = (url: string, query: string): string =>{
    return url + encodeURIComponent(query)
}