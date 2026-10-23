// Day-wise narrative for the Anveshi Arunachal Chapter.
// Narration, itemized itinerary and image URLs come from the chapter's
// source spreadsheet; the images are hosted on Supabase.

export type ArunachalPlate = {
	image: string;
	narration?: string;
};

export type ArunachalDay = {
	n: number;
	date: string;
	place: string;
	experience: string;
	itinerary: string;
	plates: ArunachalPlate[];
};

export const arunachalDays: ArunachalDay[] = [
	{
		n: 1,
		date: '25th Dec',
		place: 'Namsai, Lohit and Lower Dibang Valley',
		experience: 'Buddhist Pagodas · Hindu Kshetras · Historic Forts · Khampti Tribe',
		itinerary: 'Depart for Parashuram Kund in the morning\n- Golden Pagoda, Namsai\n- Parashuram Kund and Temple, Lohit\n\nLunch at Parashuram Kund and then depart from Bhismaknagar \n- Bhismaknagar Fort, Bhismaknagar, Lower Dibang Valley\n- RIWATCH Museum, Roing, Lower Dibang Valley\n\nDinner and night stay at Tinsukia',
		plates: [
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-1.webp',
				narration: 'On day one we will start our tour with a long drive to Namsai and Lohit districts of Arunachal.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-2.webp',
				narration: 'In Namsai we will visit the Golden Pagoda and the Tai Khampti tribe.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-3.webp'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-4.webp',
				narration: 'Then we will proceed towards Lohit district and visit the sacred Shri Parashuram Kunda, where the river Brahmaputra leaves the mountains, takes a bend and enters the plains for the first time. The river rushes along in one corner between the mountainous side and a free standing cliff in the middle of the water.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-5.webp',
				narration: 'The space with rushing water between the two rocks is the Parashuram Kunda. It is a sight to behold and an experience to be had. It is a place of absolution. It is also a testimony to the resilience and reach of the Sanatana tradition.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-6.webp',
				narration: 'After a sacred dip in this place we will have an ethnic Arunachali lunch.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-7.webp',
				narration: 'After lunch we will head to see the ruins of the ancient Bhishmakanagar Fort of Arunachal, which is the place of King Bhismaka, the father of princess Rukmini. It shows the reach of our great epic Mahabharata and how it brought Sanatana dharma to the farthest corners of Bharata. Historically this was also the place of the Chutiya kings of 14th-15th centuries.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/1-8.webp',
				narration: 'Proceeding towards Lower Dibang Valley we will visit the RIWATCH Museum at Roing, giving us a deep understanding of the lives of Arunachali tribes.'
			},
		]
	},
	{
		n: 2,
		date: '26th Dec',
		place: 'Changlang and Tinsukia',
		experience: 'Indigenous Temples · Coal and Oil Museums · Buddhist Monasteries · Tangsa and Singpo Tribes',
		itinerary: 'Enter Arunachal at Kongsa for Changlang in the morning\n- Changlang Rangfrah Temple\n- Rangfrah Vidya Niketan Visit \n\nLunch at Singpho Margherita near Ledo\n- Digboi Centenary Museum, Digboi\n- Coal Museum, Margherita\n- Mounglang Monastery, Ledo',
		plates: [
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-1.webp'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-2.webp',
				narration: 'Changlang district in East Arunachal is a witness to the evolution of an indigenous religious sect called Rangfrah. While it had always been the traditional religion of the people living in this district, particularly the Tangsa and the Nocte, Christianity in recent decades has taken many away from Rangfrah. As a resistance movement against this colonial Christian onslaught an indigenous movement has led to institutionalization of the Rangfrah sampradaya.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-3.webp',
				narration: 'The district center and many other villages now boast great temples to Rangfrah. We will first take the cohort to a Rangfrah temple and then we will have a talk with the teachers at Rangrah Vidya Niketan where education of tribal kids goes on with a national perspective.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-4.webp'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-5.webp',
				narration: 'On our way back to Assam we will take an experiential dive into the history of colonial Assam and north-east by visiting the oil museum and the coal museum at Ledo and Margherita respectively.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-6.webp',
				narration: 'We will learn how these two resources changed the entire history of the north east and how the British and the church used them to fundamentally change the character of not just Assam but also the hills of Arunachal and Nagaland. We will also learn interesting episodes from the second world history of the region. We will then visit a monastery of the Khampti tribe on our way back to the hotel.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/2-7.webp'
			},
		]
	},
	{
		n: 3,
		date: '27th Dec',
		place: 'Tinsukia, Dibrugarh and Lower Siang',
		experience: 'Hindu Temple Ruins · Revived Ahom Heritage · Contemporary Temples · The Majestic Brahmaputra · Tea Gardens',
		itinerary: 'Depart in the morning for Silapathar\n- Silapathar Buddhist Monastery\n- Malinithan Temple\n- Archaeological Museum\n\nLunch on the way to Dibrugarh\n\nDibrugarh\n- Raidongia Doul\n- Anthropological Museum\n\nTilinga Temple\nGangabari Tea Garden\n\nReturn to and night stay in Tinsukia',
		plates: [
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-1.webp',
				narration: 'We will head towards Lower Siang district of Arunachal Pradesh on the morning of the third day. On the way we will witness the dyke system of the Brahmaputra river and how in many places it flows above the ground level in the wet season.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-2.webp',
				narration: 'We will go over the longest river bridge in India - the famous Bogibeel bridge over the majestic Brahmaputra.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-3.webp',
				narration: 'Then we will go to see the ruins of an ancient temple in Malinithan, Arunachal which shows how even in tenth and eleventh century Arunachal was firmly a part of Sanatana Bharata.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-4.webp',
				narration: 'We will visit a Buddhist monastery nearby and will also visit the museum to witness the Sanatana history of the place.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-5.webp',
				narration: 'We will then also witness the glory of the Ahom rule at the Raidongia Dol, an Ahom temple, by the Tai Ahom tribe which came from the route of Pangsau pass and outside India yet assimilated so completely into the Sanatana cultural milieu of Bharata that they became the champions of Sanatana dharma for centuries.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-6.webp',
				narration: 'After witnessing the ancient temples, the Ahom revivalist temples we will then visit a contemporary focus of shraddha at Tilinga temple, the focus of contemporary spirituality in Assam.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-7.webp',
				narration: 'A visit to the Dibrugarh museum in the city of Dibrugarh will be on the cards next. Dibrugarh is one of the most important cities of Upper Assam in colonial times.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/3-8.webp',
				narration: 'We will then wrap the day with a visit to a tea garden and understanding how tea cultivation changed Assam and north east forever.'
			},
		]
	},
	{
		n: 4,
		date: '28th Dec',
		place: 'Tirap',
		experience: 'Indigenous Temples · Heritage Village Walk · Nocte Vaishnava Naga Tribe · Myanmar Border · Shaman Experience',
		itinerary: 'Depart in the morning for Khonsa\n\nKhonsa Town Visit\n- Hindu Temple & Meeting with Indigenous Elders\n\nLapnan Village Visit\n- Basti Tour - Nocte Naga Hindu Experience\n\nLunch at Lapnan Basti, following by Thinsa Village visit \n- Rangjouban Temple\n- Meeting the Last Shaman of Thinsa\n\nReturn and night stay at Tinsukia',
		plates: [
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-1.webp',
				narration: 'On the fourth and last day of the Arunachal tour, we will head towards the Tirap district of eastern Arunachal, mostly inhabited by the Nocte Naga tribe which was Hindu/ indigenous until just twenty years back or so but has heavily converted to Christianity in the past three decades.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-2.webp',
				narration: 'We will go to the largest Nocte town in the region, Khonsa, and will meet the last remaining indigenous folks and the karyakartas who are working relentlessly to save their culture and heritage.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-3.webp',
				narration: 'Then we will head towards the Lapnan basti, the last remaining Nocte Naga Hindu/ indigenous community in the Khonsa town. We will have a walking tour through the living history and culture of the tribe in their beautiful mountainous village with rolling green hills and blue skies.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-4.webp',
				narration: 'At the end of our walk at the summit of the hills, in their village morung (community house) we will witness the remnants of the last head hunters of the Nagas. And then we will chat with the tribe elders and listen to their problems and lives while having an ethnic vegetarian lunch.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-5.webp'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-6.webp',
				narration: 'After lunch we will proceed towards another village, Thinsa, where there are still some indigenous followers of Rangfrah left.'
			},
			{
				image: 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/arunachal/landscape/4-7.webp',
				narration: 'We will wrap up the tour with a meeting with the priest and the shaman and listen to the workings of the Nocte dharma, giving us an eye into the many dimensions of spirituality in the far flung regions of our country.'
			},
		]
	},
];
