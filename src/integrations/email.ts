import { expect } from '@playwright/test';
import { secret } from '../../config/env.config';

export interface InboxMessage { subject: string; text?: { body?: string } }

/** Mailosaur-backed inbox. Use `qa+<id>@<server>.mailosaur.net` addresses. */
export class EmailInbox {
  private readonly auth = () => 'Basic ' + Buffer.from(`${secret('MAILOSAUR_API_KEY')}:`).toString('base64');

  async waitForMessage(sentTo: string, subjectContains: string, timeout = 60_000): Promise<InboxMessage> {
    const res = await fetch(
      `https://mailosaur.com/api/messages/await?server=${secret('MAILOSAUR_SERVER_ID')}&timeout=${timeout}`,
      { method: 'POST', headers: { Authorization: this.auth(), 'Content-Type': 'application/json' }, body: JSON.stringify({ sentTo, subject: subjectContains }) }
    );
    expect(res.status, 'inbox lookup').toBe(200);
    return (await res.json()) as InboxMessage;
  }
}
