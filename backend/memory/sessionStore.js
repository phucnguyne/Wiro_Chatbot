const sessions = {};

export function getSession(sessionId) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }
  return sessions[sessionId];
}

export function addMessage(sessionId, role, content) {
  const session = getSession(sessionId);
  session.push({ role, content });

  if (session.length > 10) {
    session.shift();
  }
}