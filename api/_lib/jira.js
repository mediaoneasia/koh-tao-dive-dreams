import fetch from 'node-fetch';

const toAdfParagraphs = (description) => {
  const text = typeof description === 'string' ? description : '';
  const lines = text.split(/\r?\n/);
  const content = lines.map((line) => ({
    type: 'paragraph',
    content: line
      ? [{ type: 'text', text: line }]
      : [],
  }));

  return {
    version: 1,
    type: 'doc',
    content: content.length ? content : [{ type: 'paragraph', content: [] }],
  };
};

export const getJiraConfig = () => ({
  domain: process.env.JIRA_DOMAIN || 'https://divinginasia.atlassian.net',
  projectKey: process.env.JIRA_PROJECT_KEY || 'PRO',
  email: process.env.JIRA_EMAIL || process.env.JIRA_USER_EMAIL || '',
  apiToken: process.env.JIRA_API_TOKEN || '',
});

export const isJiraConfigured = () => {
  const { email, apiToken } = getJiraConfig();
  return Boolean(email && apiToken);
};

export const buildJiraIssuePayload = ({
  summary,
  description,
  labels = [],
  issueType = 'Task',
  extraFields = {},
}) => {
  const { projectKey } = getJiraConfig();

  return {
    fields: {
      project: { key: projectKey },
      summary,
      description: typeof description === 'string' ? toAdfParagraphs(description) : description,
      issuetype: { name: issueType },
      labels,
      ...extraFields,
    },
  };
};

export const createJiraIssue = async (payload) => {
  const { domain, email, apiToken } = getJiraConfig();

  if (!email || !apiToken) {
    throw new Error('Jira is not configured');
  }

  const response = await fetch(`${domain}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Jira issue creation failed: ${response.status}`);
  }

  return response.json();
};