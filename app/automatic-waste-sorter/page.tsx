'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnet, faBox } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
	const [data, setData] = useState({
		count_logam: 0,
		count_non_logam: 0,
		full_logam: false,
		full_non_logam: false
	});

	useEffect(() => {
		const interval = setInterval(() => {
			fetch('/automatic-waste-sorter/api/status')
			.then(response => response.json())
			.then(data => setData(data));
		}, 5000);
			return () => clearInterval(interval);
	}, []);

	return (
		<main className="min-h-screen bg-gray-50">
			<div className="container flex flex-col gap-y-10 md:gap-y-16 mx-auto px-8 sm:px-4 pt-10 md:pt-12 lg:pt-16">
				<div className="flex flex-col md:flex-row gap-x-2 font-plus_jakarta_sans text-4xl md:text-5xl text-slate-600">
					<h1 className="font-bold">Automatic</h1>
					<h1 className="font-bold">Waste Sorter</h1>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-12 gap-8 font-plus_jakarta_sans">
					<div className="col-span-2 md:col-span-3 h-14 md:h-44 grid grid-cols-2 grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
						<div className={`${data.full_logam ? 'bg-red-500' : 'bg-white'} rounded-lg drop-shadow`}>
							<div className={`h-full flex flex-row gap-4 md:gap-5 p-4 md:py-5 md:px-6 ${data.full_logam ? 'text-white' : 'text-slate-500'}`}>
								<FontAwesomeIcon icon={faMagnet} className={`h-full ${data.full_logam ? '' : 'text-green-500'}`}/>
								<span className="md:text-xl h-fit my-auto">Logam</span>
									<span className={`p-2 px-4 font-bold h-fit my-auto hidden md:block ms-auto rounded-lg ${data.full_logam ? 'text-slate-500 bg-white' : 'text-white bg-green-500'}`}>{data.full_logam ? 'Full' : 'Ready'}</span>
							</div>
						</div>
						<div className={`${data.full_non_logam ? 'bg-red-500' : 'bg-white'} rounded-lg drop-shadow`}>
							<div className={`h-full flex flex-row gap-4 md:gap-5 p-4 md:py-5 md:px-6 ${data.full_non_logam ? 'text-white' : 'text-slate-500'}`}>
								<FontAwesomeIcon icon={faBox} className={`h-full ${data.full_non_logam ? '' : 'text-green-500'}`}/>
								<span className="md:text-xl h-fit my-auto">Non Logam</span>
								<span className={`p-2 px-4 font-bold h-fit my-auto hidden md:block ms-auto rounded-lg ${data.full_non_logam ? 'text-slate-500 bg-white' : 'text-white bg-green-500'}`}>{data.full_non_logam ? 'Full' : 'Ready'}</span>
							</div>
						</div>
					</div>
					<div className="col-span-2 md:col-span-3 flex flex-row md:flex-col bg-white rounded-lg h-32 md:h-64 drop-shadow">
						<div className="basis-2/5 md:basis-0 flex text-slate-600">
							<div className="my-auto md:ms-0 mx-auto ps-7 md:py-4 flex flex-col md:flex-row gap-2 md:gap-4">
								<FontAwesomeIcon icon={faMagnet} className="w-8 md:w-6 mx-auto"/>
								<span className="text-xl md:text-xl font-bold md:font-normal">Logam</span>
							</div>
						</div>
						<div className="basis-3/5 flex flex-row text-slate-600">
							<div className="m-auto h-fit flex flex-row gap-2">
								<span className="text-5xl md:text-8xl font-bold my-auto">{data.count_logam}</span>
								<span className="md:text-lg mt-auto">/ today</span>
							</div>
						</div>
					</div>
					<div className="col-span-2 md:col-span-3 flex flex-row md:flex-col bg-white rounded-lg h-32 md:h-64 drop-shadow">
						<div className="basis-2/5 md:basis-0 flex text-slate-600">
							<div className="my-auto md:ms-0 mx-auto ps-7 md:py-4 flex flex-col md:flex-row gap-2 md:gap-4">
								<FontAwesomeIcon icon={faBox} className="w-8 md:w-6 mx-auto"/>
								<span className="text-xl md:text-xl font-bold md:font-normal">Non Logam</span>
							</div>
						</div>
						<div className="basis-3/5 flex flex-row text-slate-600">
							<div className="m-auto h-fit flex flex-row gap-2">
								<span className="text-5xl md:text-8xl font-bold my-auto">{data.count_non_logam}</span>
								<span className="md:text-lg mt-auto">/ today</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
    )
}
