import { useEffect, useState } from "react";

export default function App() {
	// Setting up the initial states using
	// react hook 'useState'
	const [search, setSearch] = useState("");
	const [crypto, setCrypto] = useState([]);

	// Fetching crypto data from the API only
	// once when the component is mounted
	useEffect(() => {
		fetch(
			`https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
		).then((res) => {
			return res.json()
		}).then((data)=>{
      setCrypto(data.coins);
    });
	},[]);

	return (
		<div className="App mt-5">
			<center><p style={{fontSize:"30px", fontFamily:"arial black", fontWeight:"bolder", color:"lightGray"}}>EXPOCOIN CRYPTO</p></center>
			<center><input
				type="text"
				placeholder="Search"
        style={{width:"90%", height:"50px", border:"none", outline:"none", padding:"0px 5px", borderRadius:"8px"}}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/></center>

        <table style={{width:"100%", marginTop:"50px", color:"white", textAlign:"center"}}>
				<thead style={{fontWeight:"bold"}}>
					<tr>
						<td>Rank</td>
						<td>Name</td>
						<td>Symbol</td>
						<td>Price</td>
					</tr>
				</thead>
				{/* Mapping all the cryptos */}
				<tbody>
					{/* Filtering to check for the searched crypto */}
					{crypto
						.filter((val) => {
							return val.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((val, id) => {
							return (
								<>
									<tr id={id}>
										<td className="rank">{val.rank}</td>
										<td className="logo">
											<a href={val.websiteUrl}>
												<img src={val.icon} alt="logo" width="30px" />
											</a>

											<p>{val.name}</p>

										</td>
										<td className="symbol">{val.symbol}</td>
										<td>${val.price.toFixed(2)}</td>
									</tr>
								</>
							);
						})}
				</tbody>
			</table>
       <hr></hr>
			<center><p style={{padding:"10px" , color:"gray"}}>@Copyright, Spax-duro-5000Z</p></center>
		</div>
	);
}

