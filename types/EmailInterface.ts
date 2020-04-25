export default interface Email {
  headers: Header[];
  body: string;
  snippet: string;
  id: string;
}

interface Header {
  name: string;
  value: string;
}
