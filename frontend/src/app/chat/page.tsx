'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Msg { role: 'user' | 'assistant'; content: string; }

const MODELS = [
  { v: 'llama-3.3-70b-versatile', l: 'Llama 3.3 70B' },
  { v: 'llama-3.1-8b-instant', l: 'Llama 3.1 8B (Fast)' },
  { v: 'mixtral-8x7b-32768', l: 'Mixtral 8x7B' },
];
const STARTERS = ['Explain quantum computing simply', 'Help me debug my Python code', 'Write a LinkedIn post about AI', 'Best practices for React apps'];

export default function ChatPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const bottomRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (!user) fetchUser().catch(() => router.push('/login')); }, [user]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);

  const resize = () => {
    const t = taRef.current;
    if (t) { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 180) + 'px'; }
  };

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    const next: Msg[] = [...msgs, { role: 'user', content: msg }];
    setMsgs(next); setInput('');
    if (taRef.current) taRef.current.style.height = 'auto';
    setLoading(true);
    try {
      const r = await api.post('/api/generate/chat', { messages: next, model });
      setMsgs([...next, { role: 'assistant', content: r.data.result }]);
    } catch { toast.error('Request failed'); setMsgs(next); }
    finally { setLoading(false); }
  };

  const initials = (user?.username || 'U').slice(0, 2).toUpperCase();

  return (
    <AppLayout>
      <div className="chat-layout">
        {/* Topbar */}
        <div className="chat-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--c-t2)' }}>Model</span>
            <select className="ai-select" value={model} onChange={e => setModel(e.target.value)}
              style={{ width: 'auto', padding: '5px 10px', fontSize: 12, borderRadius: 8 }}>
              {MODELS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
          </div>
          {msgs.length > 0 && (
            <button className="ai-btn ai-btn-ghost" style={{ fontSize: 13, padding: '6px 14px' }} onClick={() => setMsgs([])}>
              New chat
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {msgs.length === 0 ? (
            <div className="dash-hero" style={{ paddingTop: 80 }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>⚡</div>
              <div className="dash-greeting">What can I help with?</div>
              <p className="dash-sub">Powered by Groq — the fastest AI inference</p>
              <div className="chips-row" style={{ marginTop: 0 }}>
                {STARTERS.map(s => (
                  <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-msgs-inner">
              {msgs.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role === 'user' ? 'chat-msg-user' : ''} anim-in`}>
                  {m.role === 'assistant' && <div className="msg-avatar msg-avatar-ai">⚡</div>}
                  <div className={`msg-content ${m.role === 'user' ? 'msg-content-user' : 'msg-content-ai'}`}>
                    {m.content}
                  </div>
                  {m.role === 'user' && <div className="msg-avatar msg-avatar-user">{initials}</div>}
                </div>
              ))}
              {loading && (
                <div className="chat-msg anim-in">
                  <div className="msg-avatar msg-avatar-ai">⚡</div>
                  <div className="msg-content msg-content-ai">
                    <div className="dot-pulse"><span/><span/><span/></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-wrap">
          <div className="chat-input-inner">
            <textarea ref={taRef} className="chat-ta" rows={1}
              placeholder="Message AI Studio…"
              value={input}
              onChange={e => { setInput(e.target.value); resize(); }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
              {loading ? <span className="spinner" style={{ width: 15, height: 15 }} /> : '↑'}
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--c-t3)', marginTop: 8 }}>
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
