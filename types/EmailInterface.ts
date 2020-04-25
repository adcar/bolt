export default interface Email {
  headers: Header[];
  body: string;
  snippet: string;
}

interface Header {
  name: string;
  value: string;
}
