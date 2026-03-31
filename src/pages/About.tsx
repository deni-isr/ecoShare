export const About = () => {
  return (
    <div className="animate-in fade-in duration-500 max-w-[1000px] mx-auto">
      <div className="bg-gradient-to-br from-[#f0fff6] via-[#e8f8ed] to-[#d0f5dc] rounded-xl p-10 md:p-16 mb-8 relative overflow-hidden border border-green/15">
        <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(52,199,89,0.13)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-1 mb-4 tracking-tight">
            Kiertotaloutta <br /><span className="text-green">fiksusti ja paikallisesti.</span>
          </h1>
          <p className="text-lg text-text-2 font-medium leading-relaxed">
            EcoShare syntyi yksinkertaisesta ajatuksesta: miksi heittää pois korjattavissa olevaa tavaraa, kun lähellä saattaa asua joku, joka osaa ja haluaa korjata sen?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-green-light text-2xl flex items-center justify-center mb-4 border-2 border-white shadow-sm">♻️</div>
          <h3 className="text-lg font-bold text-text-1 mb-2">Kestävyys</h3>
          <p className="text-[15px] text-text-3 font-medium">Pidennetään tavaroiden elinkaarta järjestelmällisesti ja vähennetään elektroniikkajätettä.</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-[#fff3e0] text-2xl flex items-center justify-center mb-4 border-2 border-white shadow-sm">🤝</div>
          <h3 className="text-lg font-bold text-text-1 mb-2">Yhteisöllisyys</h3>
          <p className="text-[15px] text-text-3 font-medium">Yhdistämme ihmiset ja taidot paikallisesti. Korjaajat saavat projekteja, ja omistajat pääsevät eroon tavarasta fiksusti.</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-[#e3f2fd] text-2xl flex items-center justify-center mb-4 border-2 border-white shadow-sm">🔍</div>
          <h3 className="text-lg font-bold text-text-1 mb-2">Läpinäkyvyys</h3>
          <p className="text-[15px] text-text-3 font-medium">Selkeä vikadiagnoosi ja rehelliset kuvaukset jokaisessa ilmoituksessa helpottavat päätöksentekoa.</p>
        </div>
      </div>
    </div>
  );
};