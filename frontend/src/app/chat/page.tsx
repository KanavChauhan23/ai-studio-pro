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
  { v: 'llama-3.1-8b-instant',    l: 'Llama 3.1 8B · Fast' },
  { v: 'mixtral-8x7b-32768',      l: 'Mixtral 8x7B' },
];
const STARTERS = [
  'Explain quantum computing simply',
  'Help me debug my Python code',
  'Write a LinkedIn post about AI',
  'Best practices for React apps',
];

export default function ChatPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [msgs, setMsgs]     = useState<Msg[]>([]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel]   = useState('llama-3.3-70b-versatile');
  const bottomRef = useRef<HTMLDivElement>(null);
  const taRef     = useRef<HTMLTextAreaElement>(null);

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
      <div className="chat-shell">
        {/* Top bar */}
        <div className="chat-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--tx2)', fontWeight: 600 }}>Model</span>
            <select className="fi-sel" value={model} onChange={e => setModel(e.target.value)}
              style={{ width: 'auto', padding: '5px 10px', fontSize: 12, borderRadius: 8 }}>
              {MODELS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
          </div>
          {msgs.length > 0 && (
            <button className="btn btn-g" style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => setMsgs([])}>
              New chat
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="chat-feed">
          {msgs.length === 0 ? (
            <div className="chat-empty">
              <div className="chat-empty-icon au">⚡</div>
              <div className="chat-empty-h au au1">What can I help with?</div>
              <div className="chat-empty-s au au2">Powered by Groq — the fastest AI inference</div>
              <div className="sq au au3">
                {STARTERS.map(s => (
                  <button key={s} className="sq-chip" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-inner">
              {msgs.map((m, i) => (
                <div key={i} className={`cmsg ${m.role === 'user' ? 'cmsg-u' : ''} au`}>
                  {m.role === 'assistant' && <div className="cav cav-ai">⚡</div>}
                  <div className={m.role === 'user' ? 'cbub-u' : 'cbub-ai'}>{m.content}</div>
                  {m.role === 'user' && <div className="cav cav-u">{initials}</div>}
                </div>
              ))}
              {loading && (
                <div className="cmsg au">
                  <div className="cav cav-ai">⚡</div>
                  <div className="cbub-ai"><div className="tdots"><span/><span/><span/></div></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-foot">
          <div className="chat-box">
            <textarea ref={taRef} className="chat-ta" rows={1}
              placeholder="Message AI Studio…"
              value={input}
              onChange={e => { setInput(e.target.value); resize(); }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            />
            <button className="send" onClick={() => send()} disabled={loading || !input.trim()}>
              {loading
                ? <span className="spin" style={{ width: 15, height: 15 }} />
                : '↑'}
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--tx3)', marginTop: 8 }}>
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
