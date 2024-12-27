import React from 'react';
import { AuthForm } from './components/AuthForm';
import { BookHeadphones } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,0.9),rgba(0,0,0,0.9))]" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      </div>
      
      <div className="relative mb-8 flex items-center gap-2 animate-float">
        <BookHeadphones className="w-8 h-8 text-white" />
        <h1 className="text-2xl font-bold text-white">TranscribeAI</h1>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 rounded-2xl blur-xl opacity-30" />
        <AuthForm />
      </div>
      
      <div className="relative mt-8 text-center text-white/40 text-sm animate-pulse-slow">
        Powered by advanced AI transcription technology
      </div>
    </div>
  );
}

export default App;
