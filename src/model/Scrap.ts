export class Scrap {
  title: string;
  href: string;
  hits: number;
  comments: number;

  constructor(title: string, href: string, hits?: number, comments?: number) {
    this.title = title;
    this.href = href;
    this.hits = hits ?? 0;
    this.comments = comments ?? 0;
  }
}
