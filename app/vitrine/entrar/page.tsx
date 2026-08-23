'use client';

import { useState } from 'react';

export default function VitrineEntrar() {
  const [cor, setCor] = useState('#8B5E3C');
  const [nome, setNome] = useState('Nome do negócio');

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100 bg-white">
        <input value={nome} onChange={(e)=>setNome(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"/>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          cor da marca
          <input type="color" value={cor} onChange={(e)=>setCor(e.target.value)}
            className="w-9 h-8 border-0 bg-transparent p-0 cursor-pointer"/>
        </label>
        <span className="text-xs text-gray-400">a mesma tela, qualquer cliente</span>
      </div>

      <div className="flex items-center justify-center p-8" style={{ minHeight:'70vh' }}>
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-lg"
              style={{ background:`linear-gradient(to bottom right, ${cor}, ${cor}bb)` }}>
              {nome.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl text-gray-800 leading-none" style={{ fontFamily:'Cormorant Garamond, serif' }}>{nome}</h1>
              <p className="text-xs text-gray-400 mt-1">painel do dono</p>
            </div>
          </div>
          <input placeholder="E-mail" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3 text-gray-800"/>
          <input placeholder="Senha" type="password" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800"/>
          <button className="w-full mt-4 py-3.5 rounded-xl text-white"
            style={{ background:`linear-gradient(to bottom right, ${cor}, ${cor}bb)` }}>Entrar</button>
        </div>
      </div>
    </main>
  );
}
