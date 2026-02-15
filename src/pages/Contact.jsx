import Container from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useToast } from "../components/ui/Toast";
import { useState } from "react";

export default function Contact() {
  const { push } = useToast();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    push("Message sent (demo).", "success");
    setName("");
    setMsg("");
  };

  return (
    <div className="bg-paper-100 dark:bg-slate-900">
      <Container className="py-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <p className="mt-2 text-sm text-ink-500">Send a message. (UI only)</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea
              className="w-full rounded-lg border border-line bg-paper-50 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
              rows={6}
              placeholder="Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Send
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
