import { useState } from 'react';

const EkonomiLathunden = () => {

    const [itp1, setItp1] = useState(false);
    const [timpris, setTimpris] = useState(750);
    const [arbetstimmar, setArbetstimmar] = useState(1700);
    const [ovrigt, setOvrigt] = useState(20000);

    const arbGivAvgPrc = 0.3142;
    const loneskattPrc = 0.2426;

    const [bruttoLon, setBruttoLon] = useState(51200);
    const [arbetsgivaravgift, setArbetsgivaravgift] = useState(Math.ceil(bruttoLon*arbGivAvgPrc));

    const [tjanstepension, setTjanstepension] = useState(4000);
    const [loneskatt, setLoneskatt] = useState(Math.ceil(tjanstepension*loneskattPrc));
    
    const andraLon = (nyLon) => {
        if(nyLon < 0) {
            nyLon = 0;
        }
        setBruttoLon(nyLon);
        setArbetsgivaravgift(Math.ceil(nyLon*arbGivAvgPrc));

        if(itp1) {
            beraktaItp1Pension(nyLon);
        }
    }

    const andraPension = (pension) => {
        if(pension < 0) {
            pension = 0;
        }
        setTjanstepension(pension);

        setLoneskatt(Math.ceil(pension*loneskattPrc));
    }

    const handleItp1Change = () => {
        setItp1(!itp1); 
        if(!itp1) {
            beraktaItp1Pension(bruttoLon);
        }
    }

    const beraktaItp1Pension = (lon) => {
        let itp1Low = 0;
        let itp1High = 0;
        if((lon - 46438) > 0) {
            itp1High = (lon - 46438)*0.3;
            itp1Low = 46438*0.045;
        } else {
            itp1Low = lon*0.045;
        }
        setTjanstepension(Math.ceil(itp1Low+itp1High));
        setLoneskatt(Math.ceil((itp1Low+itp1High)*loneskattPrc));
    }

    return ( 
        <div className="ekonomiInput">
            <h3>Timpris: </h3>
            <input 
                type="number" 
                value={timpris}
                onChange={(e) => setTimpris(e.target.value)}
            />
            <h3>Arbetstimmar:</h3>
            <input 
                type="number" 
                value={arbetstimmar}
                onChange={(e) => setArbetstimmar(e.target.value)}
            />
            <p>Ex: 1700 timmar ger ungefär 8 veckor ledigt med 40 timmars veckor.</p>
            <h3>Månadslön</h3>
            <p>Bruttolön: {bruttoLon} kr</p>
            <button onClick={() => andraLon(bruttoLon+1000)}>+1000 kr</button><button onClick={() => andraLon(bruttoLon-1000)}>-1000 kr</button>
            <button onClick={() => andraLon(bruttoLon+100)}>+100 kr</button><button onClick={() => andraLon(bruttoLon-100)}>-100 kr</button>
            <p>Arbetsgivaravgifter: {arbetsgivaravgift} kr</p>
            <h3>Tjänstepension</h3>
            <div class="infotext">
            <label>
                <p><input
                    type="checkbox"
                    checked={itp1}
                    onChange={handleItp1Change}
                /> ITP 1 - pensionen beräknas automatiskt utifrån ITP 1 - 2023 års basbelopp</p>
            </label>
            </div>
            <p>Pension: {tjanstepension} kr</p>
            { !itp1 && <div><button onClick={() => andraPension(tjanstepension+1000)}>+1000 kr</button><button onClick={() => andraPension(tjanstepension-1000)}>-1000 kr</button>
            <button onClick={() => andraPension(tjanstepension+100)}>+100 kr</button><button onClick={() => andraPension(tjanstepension-100)}>-100 kr</button>
            <button onClick={() => andraPension(0)}>Nollställ pension</button></div> }
            <p>Särskild löneskatt: {loneskatt} kr</p>
            <h3>Totalkostnad för lön och tjänstepension per månad</h3>
            <p>{bruttoLon+arbetsgivaravgift+tjanstepension+loneskatt} kr</p>
            <p>{Math.ceil((bruttoLon+arbetsgivaravgift+tjanstepension+loneskatt)/(timpris*8))} arbetsdagar krävs.</p>
            <h3>Totalkostnad för lön och tjänstepension på ett år</h3>
            <p>{(bruttoLon+arbetsgivaravgift+tjanstepension+loneskatt)*12} kr</p>
            <h3>Övriga kostnader</h3>
            <input 
                type="number" 
                value={ovrigt}
                onChange={(e) => setOvrigt(e.target.value)}
            />
            <h3>Årsinkomst ({arbetstimmar} timmar)</h3>
            <p>{Math.floor(arbetstimmar*timpris)} kr</p>
            <h3>Buffert</h3>
            <p>{Math.floor(arbetstimmar*timpris) - (bruttoLon+arbetsgivaravgift+tjanstepension+loneskatt)*12 - ovrigt} kr</p>
        </div>
     );
}
 
export default EkonomiLathunden;