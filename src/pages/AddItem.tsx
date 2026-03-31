import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddItem = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<'repair' | 'donate' | 'sell'>('repair');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4);
      const newImages = filesArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="max-w-[900px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text-1 tracking-tight">Lisää uusi ilmoitus</h1>
        <p className="text-text-3 font-medium">Täytä tiedot huolellisesti ja anna tavaralle uusi elämä.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">
          
          <section className="bg-bg rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-[13px] font-bold text-text-2 uppercase tracking-wider mb-4">Perustiedot</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[14px] font-semibold text-text-2 mb-1.5">Mitä olet antamassa tai myymässä?</label>
                <input 
                  type="text" 
                  required 
                  placeholder="esim. Moccamaster tai iPhone 13" 
                  className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-text-2 mb-1.5">Kuvaus</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Kerro tavaran kunnosta ja mahdollisista vioista tarkemmin..." 
                  className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-green/50 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          <section className="bg-bg rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-[13px] font-bold text-text-2 uppercase tracking-wider mb-4">Kuvat (enintään 4)</h2>
            <div className="grid grid-cols-4 gap-3">
              {images.map((src, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-border bg-fill-1">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ))}
              {images.length < 4 && (
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-border-mid flex flex-col items-center justify-center text-text-4 hover:border-green hover:text-green transition-all bg-fill-1/50"
                >
                  <span className="text-2xl">+</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight">Lisää</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
              multiple 
            />
          </section>

        </div>

        <div className="flex flex-col gap-6">
          <section className="bg-bg rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-[13px] font-bold text-text-2 uppercase tracking-wider mb-4">Ilmoitustyyppi</h2>
            <div className="flex flex-col gap-2">
              {(['repair', 'donate', 'sell'] as const).map((t) => (
                <label 
                  key={t}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${status === t ? 'border-green bg-green-light' : 'border-border bg-white'}`}
                >
                  <span className="flex items-center gap-2 font-bold text-[14px]">
                    <span className={`w-2 h-2 rounded-full ${t === 'repair' ? 'bg-orange' : t === 'donate' ? 'bg-green' : 'bg-blue'}`}></span>
                    {t === 'repair' ? 'Kaipaa korjausta' : t === 'donate' ? 'Lahjoitetaan' : 'Myydään'}
                  </span>
                  <input 
                    type="radio" 
                    name="status" 
                    checked={status === t} 
                    onChange={() => setStatus(t)} 
                    className="hidden" 
                  />
                  {status === t && <span className="text-green font-bold text-sm">✓</span>}
                </label>
              ))}
            </div>

            {status === 'sell' && (
              <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                <label className="block text-[14px] font-semibold text-text-2 mb-1.5">Hinta (€)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full bg-fill-1 border border-border rounded-lg px-4 py-2 text-[15px] font-bold"
                />
              </div>
            )}
          </section>

          <button 
            type="submit" 
            className="w-full bg-text-1 text-white rounded-xl py-4 font-bold text-[16px] shadow-md hover:bg-black transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Julkaise ilmoitus
          </button>
        </div>
      </form>
    </div>
  );
};