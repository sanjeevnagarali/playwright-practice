import { ticketTag } from './tags';

/** Links a test to its ticket and approved test-plan case: test(title, trace('PROJ-123','TC-01', [Tags.smoke]), fn) */
export function trace(ticket: string, testCase: string, tags: string[] = []) {
  return {
    tag: [ticketTag(ticket), ...tags],
    annotation: [{ type: 'trace', description: `${ticket}/${testCase}` }]
  };
}
