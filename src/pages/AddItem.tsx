import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddItem = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    condition: 'Hyvä',
    status: 'repair',
    price: '',
    contact_phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5 - images.length);
      const newImages = filesArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
      setImageFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser.id) {
      setErrorMsg('Sinun täytyy kirjautua sisään julkaistaksesi ilmoituksen.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('condition', formData.condition);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('contact_phone', formData.contact_phone);
    formDataToSend.append('user_id', currentUser.id.toString());
    
    imageFiles.forEach(file => {
      formDataToSend.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Ilmoituksen julkaisu epäonnistui');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text-1 tracking-tight">Lisää uusi ilmoitus</h1>
      </div>

      {errorMsg && (
        <div className="bg-[#ffebee] text-[#c62828] px-4 py-3 rounded-lg text-[14px] font-bold mb-6 flex items-center gap-2">
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <section className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-text-1 mb-4">Kuvat</h2>
            
            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-3 mb-4">
                {images.map((src, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-border relative">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center text-xs hover:bg-black/70">✕</button>
                  </div>
                ))}
              </div>
            )}

            {images.length < 5 && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border-mid rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-fill-1 hover:border-green transition-all group"
              >
                <div className="w-12 h-12 bg-fill-2 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">📷</div>
                <div className="text-[15px] font-bold text-text-1 mb-1">Vedä kuvat tähän</div>
                <div className="text-[13px] font-medium text-text-3">tai <span className="text-green underline">selaa tiedostoja</span> · JPG, PNG, WEBP</div>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" multiple />
          </section>

          <section className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-text-1 mb-4">Ilmoitustyyppi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'repair', icon: '🔧', label: 'Kaipaa korjausta' },
                { id: 'donate', icon: '♻️', label: 'Lahjoitetaan' },
                { id: 'sell',   icon: '🏷️', label: 'Myydään' }
              ].map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setFormData({ ...formData, status: t.id, price: t.id === 'sell' ? formData.price : '' })}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.status === t.id ? 'border-green bg-green-light/30 shadow-[0_4px_12px_rgba(52,199,89,0.1)] scale-[1.02]' : 'border-border bg-white hover:border-border-mid'}`}
                >
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className="text-[14px] font-bold text-text-1">{t.label}</div>
                  {formData.status === t.id && <div className="absolute top-2 right-2 text-green text-sm font-bold">✓</div>}
                </div>
              ))}
            </div>

            {formData.status === 'sell' && (
              <div className="mt-5 animate-in slide-in-from-top-2 duration-200">
                <label className="block text-[13px] font-bold text-text-2 mb-1.5">Hinta (€) <span className="text-red">*</span></label>
                <input 
                  type="number" 
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00" 
                  className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-bold outline-none focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)] transition-all"
                />
              </div>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm flex flex-col gap-5">
            <h2 className="text-[16px] font-bold text-text-1 mb-1">Perustiedot</h2>

            <div>
              <label className="block text-[13px] font-bold text-text-2 mb-1">Otsikko <span className="text-red">*</span></label>
              <p className="text-[12px] font-medium text-text-3 mb-2">Ole tarkka — hyvä otsikko saa enemmän huomiota</p>
              <input 
                type="text" 
                name="title" required value={formData.title} onChange={handleChange}
                placeholder="esim. Moccamaster KB 741" 
                className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium outline-none focus:bg-white focus:border-green transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-text-2 mb-1.5">Kategoria <span className="text-red">*</span></label>
                <div className="relative">
                  <select name="category" required value={formData.category} onChange={handleChange} className="w-full bg-fill-1 border border-border rounded-lg pl-4 pr-10 py-3 text-[15px] font-medium outline-none focus:bg-white focus:border-green transition-all appearance-none cursor-pointer">
                    <option value="">Valitse...</option>
                    <option value="Kodinkoneet">Kodinkoneet</option>
                    <option value="Huonekalut">Huonekalut</option>
                    <option value="Urheilu">Urheilu</option>
                    <option value="Vaatteet">Vaatteet</option>
                    <option value="Kirjat">Kirjat</option>
                    <option value="Työkalut">Työkalut</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-4">▼</div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-text-2 mb-1.5">Sijaintikaupunki <span className="text-red">*</span></label>
                <div className="relative">
                  <select name="location" required value={formData.location} onChange={handleChange} className="w-full bg-fill-1 border border-border rounded-lg pl-4 pr-10 py-3 text-[15px] font-medium outline-none focus:bg-white focus:border-green transition-all appearance-none cursor-pointer">
                    <option value="">Valitse...</option>
                    <option value="Helsinki">Helsinki</option>
                    <option value="Espoo">Espoo</option>
                    <option value="Vantaa">Vantaa</option>
                    <option value="Tampere">Tampere</option>
                    <option value="Turku">Turku</option>
                    <option value="Oulu">Oulu</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-4">▼</div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-text-2 mb-1.5">Kuvaus</label>
              <textarea 
                name="description" rows={4} value={formData.description} onChange={handleChange}
                placeholder="Kerro tavaran kunnosta ja mahdollisista vioista tarkemmin..." 
                className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium outline-none focus:bg-white focus:border-green transition-all resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-text-2 mb-2">Kunto</label>
              <div className="flex bg-fill-1 p-1 rounded-lg border border-border">
                {['Uusi', 'Hyvä', 'Kohtalainen', 'Heikko'].map(kunto => (
                  <div 
                    key={kunto}
                    onClick={() => setFormData({ ...formData, condition: kunto })}
                    className={`flex-1 text-center py-2 text-[14px] rounded-md cursor-pointer transition-all ${formData.condition === kunto ? 'bg-white font-bold shadow-sm text-text-1' : 'font-medium text-text-3 hover:text-text-2'}`}
                  >
                    {kunto}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── YHTEYSTIETO ── */}
          <section className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-text-1 mb-4">Yhteystieto</h2>
            <div>
              <label className="block text-[13px] font-bold text-text-2 mb-1.5">Puhelinnumero (WhatsApp) <span className="text-red">*</span></label>
              <input 
                type="tel" name="contact_phone" required value={formData.contact_phone} onChange={handleChange}
                placeholder="+358 40 123 4567" 
                className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium outline-none focus:bg-white focus:border-green transition-all"
              />
            </div>
          </section>
        </div>

        {/* OIKEA PUOLI (1 sarake: Vinkit & Napit) */}
        <div className="flex flex-col gap-5 relative">
          <div className="sticky top-24 flex flex-col gap-5">
            
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💡</span>
                <h3 className="text-[16px] font-bold text-text-1">Vinkkejä</h3>
              </div>
              <ul className="flex flex-col gap-4 text-[13.5px] text-text-2 font-medium">
                <li className="flex gap-3"><strong className="text-text-1 bg-fill-2 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</strong> Lisää vähintään 2–3 kuvaa eri kulmista — hyvä kuva tuplaa yhteydenotot.</li>
                <li className="flex gap-3"><strong className="text-text-1 bg-fill-2 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</strong> Tarkat otsikot löytyvät hakutuloksista tehokkaammin.</li>
                <li className="flex gap-3"><strong className="text-text-1 bg-fill-2 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</strong> Lisää kaupunginosa, niin lähellä olijat löytävät sinut helpommin.</li>
                <li className="flex gap-3"><strong className="text-text-1 bg-fill-2 w-5 h-5 rounded-full flex items-center justify-center shrink-0">4</strong> Vastaa nopeasti — aktiiviset käyttäjät saavat enemmän yhteydenottoja.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button type="submit" disabled={isLoading} className="w-full bg-green text-white rounded-xl py-4 font-bold text-[16px] shadow-[0_4px_16px_rgba(52,199,89,0.3)] hover:-translate-y-0.5 hover:bg-[#2fb350] active:translate-y-0 disabled:opacity-70 transition-all flex items-center justify-center gap-2">
                {isLoading ? 'Julkaistaan...' : 'Julkaise ilmoitus'}
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};