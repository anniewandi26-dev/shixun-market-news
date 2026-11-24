import type { KnowledgeArticle } from '../../types'

export const KNOWLEDGE_MS: KnowledgeArticle[] = [
  {
    id: 'what-is-stock',
    title: 'Apakah Itu Saham? Daripada Pemilikan ke Penentuan Harga',
    category: '入门',
    readMinutes: 22,
    summary:
      'Membeli saham bukan membeli nombor yang berkelip—ia bermakna membeli tuntutan ke atas aliran tunai masa depan syarikat.',
    sections: [
      {
        heading: 'Saham, dalam bahasa ringkas',
        paragraphs: [
          'Saham mewakili bahagian pemilikan dalam syarikat. Apabila anda membeli sahamnya, anda menjadi salah seorang pemegang saham: apabila perniagaan menjana wang dan nilainya naik, pegangan anda biasanya bernilai lebih; apabila operasi melemah atau sentimen runtuh, kerugian boleh besar. Memahami ini lebih penting daripada menghafal sebarang penunjuk teknikal.',
          'Ramai yang melihat skrin sebut harga buat kali pertama terpesona dengan tick merah dan hijau serta menganggap pelaburan ialah meneka pergerakan esok. Sebenarnya, bursa hanya memadankan harga di mana pemilikan bertukar tangan. Yang anda benar-benar beli ialah keuntungan dan dividen yang mungkin dijana syarikat pada masa depan, serta gandaan yang pasaran sanggup bayar untuk pendapatan itu.',
          'Jadi langkah pertama mempelajari saham bukan mempelajari cara “beli ketika jatuh”, tetapi belajar bertanya: Bagaimanakah syarikat ini menjana wang? Mengapa pelanggan tidak boleh berbuat tanpanya? Siapakah pesaingnya? Adakah pengurusan akan membazirkan modal? Soalan-soalan itu lebih hampir kepada intipati pelaburan berbanding sama ada volum melonjak hari ini.',
        ],
      },
      {
        heading: 'Dari manakah harga: lelongan jangka pendek, sauh jangka panjang',
        paragraphs: [
          'Harga saham ditetapkan oleh pembeli dan penjual yang memadankan di bursa. Dalam jangka pendek, ia seperti lelongan: siapa yang lebih tergesa-gesa atau lebih agresif menggerakkan harga. Berita, aliran dana, sentimen, dan leveraj boleh menolak harga jauh dalam beberapa hari.',
          'Dalam jangka panjang, harga cenderung mengorbit sekitar jumlah aliran tunai bebas yang boleh dijana syarikat. Apabila kadar faedah naik, nilai kini tunai masa depan yang sama turun, dan penilaian selalunya tertekan; apabila kadar turun dan kecairan mencukupi, cerita pertumbuhan tinggi lebih mudah dikejar.',
          'Anggap volatiliti jangka pendek sebagai hingar dan kuasa pendapatan jangka panjang sebagai isyarat. Hingar kuat tidak bermakna tiada isyarat; isyarat sebenar tidak bermakna anda boleh tepat pada paras esok. Pelaburan melatih kebarangkalian dan kesabaran, bukan meneka nasib.',
        ],
      },
      {
        heading: 'Tiga bezah yang perlu anda faham dengan jelas',
        paragraphs: [
          'Harga vs. nilai: harga berubah setiap hari; nilai biasanya berubah lebih perlahan. Murah atau mahal dinilai berbanding nilai, bukan berbanding penutupan semalam.',
          'Volatiliti vs. risiko: penurunan menyakitkan, tetapi yang memusnahkan akaun biasanya ialah kerugian modal kekal—syarikat salah, leveraj salah, jualan terpaksa pada masa terburuk. Volatiliti boleh mereda dari masa ke masa; muflis dan margin call tidak.',
          'Menjana wang vs. kualiti pendapatan: spekulasi tematik juga boleh untung, tetapi ketidakpastian lebih tinggi dan penurunan lebih pedas. Wang yang disokong pertumbuhan perniagaan dan aliran tunai bebas cenderung lebih tahan lama. Ketahui jenis mana yang anda peroleh dan padankan saiz kedudukan serta minda.',
        ],
      },
      {
        heading: 'Kesilapan mahal yang dibuat pemula',
        paragraphs: [
          'Menyamakan “naik” dengan “saya betul.” Kenaikan jangka pendek mungkin hanya sentimen dan aliran dana; ia tidak membuktikan tesis anda. Begitu juga, penurunan jangka pendek tidak semestinya bermakna perniagaan merosot.',
          'Menghabiskan tenaga meramal pembukaan. Walaupun anda meneka betul beberapa kali, sukar untuk mengulanginya. Laluan yang lebih stabil: bina rangka kerja memahami syarikat, kemudian tentukan sama ada anda sanggup menanggung ketidakpastian.',
          'Bertaruh besar atas khabar angin. Apabila sumber tidak jelas atau tidak boleh disahkan, saiz kedudukan harus kecil—atau sifar. Kelebihan maklumat jarang pada pelabur runcit; disiplin boleh.',
        ],
      },
      {
        heading: 'Cara mula belajar tanpa sesat',
        paragraphs: [
          'Susunan cadangan: saham dan peraturan akaun → makna kasar tiga penyata kewangan → ukuran penilaian biasa → baru kemudian irama dagangan dan carta. Melangkau terus ke “corak mesti naik” menukar nasib menjadi kemahiran dalam kepala anda.',
          'Untuk setiap konsep, uji terhadap syarikat yang anda kenal—Moutai, Tencent, Apple, NVIDIA, apa sahaja. Perkataan abstrak melekat apabila dikaitkan dengan perniagaan sebenar.',
          'Laman ini menawarkan sebut harga dan pendidikan untuk merendahkan halangan maklumat, bukan untuk memutuskan bagi anda. Sebarang beli atau jual harus sesuai dengan horizon dan toleransi risiko anda, dan anda harus semak penyata rasmi.',
        ],
      },
    ],
  },
  {
    id: 'bull-bear',
    title: 'Pasaran Menodai dan Menurun: Kitaran, Sentimen, dan Kedudukan Anda',
    category: '术语',
    readMinutes: 20,
    summary:
      'Menodai dan menurun bukan suis hidup/mati—ia fasa yang dibentuk oleh selera risiko, kecairan, dan jangkaan pendapatan.',
    sections: [
      {
        heading: 'Apa yang dimaksudkan pasaran menodai dan menurun',
        paragraphs: [
          'Pasaran menodai biasanya menunjukkan aliran naik luas, pusing ganti aktif, pembiayaan dan terbitan lebih mudah, serta naratif media optimistik; pasaran menurun sering membawa penurunan, penghindaran risiko, ketatnya kredit, dan keyakinan hancur. Ia jarang bertukar semalaman—lebih kerap ia memanas atau membeku secara perlahan.',
          'Anda boleh membacanya sebagai “berapa banyak pasaran sanggup bayar untuk ketidakpastian.” Apabila optimistik, orang membayar gandaan lebih tinggi untuk masa depan; apabila pesimistik, walaupun aliran tunai pasti didiskaun.',
        ],
      },
      {
        heading: 'Jangan terperangkap dalam “−20% = menurun”',
        paragraphs: [
          'Dalam amalan, sesetengah menggunakan “kira-kira penurunan 20% dari puncak” sebagai panduan pasaran menurun, tetapi itu label statistik, bukan hukum fizik. Sesetengah kenaikan perlahan terasa seperti air suam; sesetengah penurunan pantas seperti menyelam. Dalam pasaran berstruktur indeks boleh rata sementara satu sektor melonjak, dan label menodai/menurun ringkas gagal.',
          'Lebih berguna ialah sekumpulan isyarat: adakah pendapatan diturunkan unjuran, adakah kredit mengecut, adakah volatiliti naik secara sistemik, adakah wang keluar dari risiko ke tunai dan bon? Satu peraturan harga ialah peringatan, bukan keputusan.',
        ],
      },
      {
        heading: 'Musuh anda berubah mengikut fasa',
        paragraphs: [
          'Dalam pasaran menodai, musuh terbesar ialah leveraj dan mengejar FOMO. Apabila semua untung, anda rasa ketinggalan—tambah saiz, tambah leveraj, kurangkan masa penyelidikan. Kerap anda tangkap tongkat terakhir.',
          'Dalam pasaran menurun, musuh terbesar ialah terpaksa jual di paras terendah—biasanya daripada saiz terlalu besar, ketidaksepadanan matang, atau bertaruh cerita panjang dengan wang pendek. Pasaran menurun juga cipta perangkap yang kelihatan murah sementara asas masih merosot.',
          'Pasaran mendatar paling memenatkan: strategi berubah-ubah, yuran dan psikologi sama-sama berdarah. Kemudian kurangkan pusing ganti dan ketahui sama ada anda dagang trend atau peruntukan nilai mengalahkan mencari inspirasi harian.',
        ],
      },
      {
        heading: 'Rangka kerja kedudukan yang boleh dikekalkan',
        paragraphs: [
          'Kerja mundur dari “berapa penurunan yang boleh saya tanggung tanpa runtuh?” Jika 25% akan hilang tidur dan rosakkan rancangan, pendedahan terlalu tinggi.',
          'Gunakan “berapa tahun sebelum saya perlukan wang ini” untuk pilih jenis aset. Wang jangka lebih pendek tidak sepatutnya duduk dalam pertumbuhan volatiliti tinggi.',
          'Gunakan “bagaimana jika saya salah?” untuk reka keluar. Ramalan boleh salah; rancangan tidak boleh kosong. Label menodai/menurun menjadi lapuk; disiplin kedudukan tidak.',
        ],
      },
    ],
  },
  {
    id: 'pe-pb',
    title: 'P/E dan P/B: Menggunakan Gandaan Penilaian dengan Betul',
    category: '估值',
    readMinutes: 24,
    summary:
      'PE dan PB bukan pelekat “murah”—ia menterjemah harga kepada apa yang pasaran bayar.',
    sections: [
      {
        heading: 'P/E: membayar untuk berapa tahun keuntungan',
        paragraphs: [
          'Nisbah harga kepada pendapatan (P/E) = harga saham ÷ pendapatan sesaham. Dalam bahasa ringkas: pada keuntungan hari ini, berapa tahun untuk “memperoleh semula” harga. Ia menukar “mahal atau murah” kepada gandaan boleh dibandingkan.',
          'P/E rendah tidak automatik murah—ia mungkin industri matang, pendapatan sekali, atau keuntungan akan jatuh; P/E tinggi tidak automatik gelembung—pasaran mungkin membayar untuk pertumbuhan lebih pantas dan aliran tunai berkualiti lebih tinggi.',
          'Bezakan P/E lampau, P/E bergulung, dan P/E hadapan. Untuk nama pertumbuhan, institusi sering bincang PEG (P/E vs. pertumbuhan) dan konsensus tahun depan. P/E rendah tanpa pertumbuhan dan P/E tinggi disokong pertumbuhan pantas ialah haiwan berbeza.',
        ],
      },
      {
        heading: 'P/B: lebih baik apabila aset ketara',
        paragraphs: [
          'Nisbah harga kepada nilai buku (P/B) = harga saham ÷ nilai buku sesaham. Bank, penanggung insurans, dan pengilang kitaran berat lebih banyak guna P/B; firma internet aset ringan sering kurang nilai jenama, perisian, dan kesan rangkaian dalam lembaran imbangan, jadi P/B kurang penting.',
          'Baca P/B bersama ROE. P/B tinggi disokong ROE tinggi boleh adil; P/B tinggi dengan ROE rendah biasanya wajar berhati-hati. Dalam susunan Buffett, kualiti pulangan modal mengalahkan mana-mana gandaan tunggal.',
        ],
      },
      {
        heading: 'Mengapa “satu gandaan sahaja” menyakitkan',
        paragraphs: [
          'Sekurang-kurangnya, lihat bersama pertumbuhan hasil dan keuntungan, ROE atau ROIC, leveraj, aliran tunai bebas, median rakan sebaya, dan persentil sejarah. Penilaian ialah alat perbandingan, bukan formula nasib.',
          'Kitaran pada puncak keuntungan boleh kelihatan murah pada P/E (pendapatan terbengkak); pada lembah, P/E boleh sangat tinggi atau N/A. Beli “P/E rendah” secara mekanikal sering mendarat malam sebelum kitaran berpaling.',
          'Perakaunan boleh dibengkokkan oleh M&A, belian balik saham, penurunan nilai, dan item sekali. Nota kaki mengalahkan formula hafalan untuk mengelakkan periuk api.',
        ],
      },
      {
        heading: 'Senarai semak praktikal',
        paragraphs: [
          'Di manakah P/E dan P/B saham ini berbanding julat lima tahun sendiri? Berbanding rakan sebaya?',
          'Adakah pendapatan berulang, atau sekali? Adakah aliran tunai bebas ikut keuntungan dilaporkan?',
          'Jika pertumbuhan separuh, adakah penilaian ini masih tahan? Tulis mengalahkan rasa perut.',
        ],
      },
    ],
  },
  {
    id: 'a-hk-us',
    title: 'Saham-A, Hong Kong, dan Pasaran AS: Peraturan dan Minda',
    category: '市场',
    readMinutes: 25,
    summary:
      'Syarikat sama boleh didagangkan pada laluan sangat berbeza dalam pasaran berbeza.',
    sections: [
      {
        heading: 'Saham-A: peraturan jelas, sentimen terang',
        paragraphs: [
          'Saham-A tanah besar sebut harga dalam RMB; kebanyakan nama papan utama ada had harian (kira-kira ±10%, lebih luas di ChiNext/STAR), penyelesaian kebanyakannya T+1, bahagian runcit relatif tinggi, dan dagangan tematik serta sentimen aktif. Dasar, kecairan, dan pelan industri sangat membentuk putaran gaya.',
          'Had harga mengubah permainan: kecairan dan maklum balas berhampiran had naik sangat berbeza daripada lelongan berterusan AS. T+1 juga bermakna anda tidak boleh jual pada hari yang sama anda beli—kurang ruang untuk kesilapan jangka pendek.',
        ],
      },
      {
        heading: 'Hong Kong: harga global, volatiliti terus terang',
        paragraphs: [
          'Saham Hong Kong didagangkan dalam HKD, tanpa had harian dan T+0; institusi dan modal antarabangsa berat; pengeluar sama sering tunjuk premium atau diskaun A+H—didorong asas pelabur, kecairan, kemudahan margin, dan selera risiko, bukan “pasaran mana betul.”',
          'Hong Kong sensitif kepada kecairan dolar global. Hasil Treasuri AS, indeks dolar, dan aliran selatan sering menerangkan gaya hari lebih daripada cerita setempat tengah hari.',
        ],
      },
      {
        heading: 'AS: kadar faedah, mega-cap, dan pendedahan',
        paragraphs: [
          'Saham AS didagangkan dalam USD, tanpa had harian (pemutus litar dalam keadaan melampau), sesi pra- dan pasca-pasaran aktif, serta persekitaran pendedahan dan tindakan kelas lebih matang. Gergasi teknologi mendominasi indeks; penilaian sensitif kepada kadar faedah dan kecairan dolar.',
          'Perbandingan merentas pasaran perlukan penjajaran FX dan sesi. Sentimen siang tanah besar tidak dipetakan bersih kepada waktu malam AS, dan sebaliknya.',
        ],
      },
      {
        heading: 'Nasihat praktikal',
        paragraphs: [
          'Pertama jelaskan mata wang asas, akses dagangan, dan geseran cukai anda; kemudian sama ada anda menjejak syarikat atau beta pasaran. Ramai fikir mereka pilih saham padahal hanya bertaruh selera risiko.',
          'Jika anda pantau ketiga-tiga tempat, kekalkan satu senarai pendek: indeks utama, DXY, hasil Treasuri, aliran utara/selatan, dan kalendar pendapatan pegangan anda. Beberapa input stabil mengalahkan ditarik tajuk berita.',
          'Jika nama sama ada penyenaraian A, H, dan ADR, bandingkan kecairan, jurang penilaian, dan geseran dagangan yang anda boleh terima—kemudian pilih satu tempat, bukannya mengejar mana yang bergerak hari ini.',
        ],
      },
    ],
  },
  {
    id: 'risk',
    title: 'Risiko dan Saiz Kedudukan: Bertahan Dulu, Kemudian Untung',
    category: '风控',
    readMinutes: 22,
    summary:
      'Prinsip pertama pelaburan bukan memaksimumkan keuntungan—ia mengelak satu kesilapan yang menamatkan kompaun.',
    sections: [
      {
        heading: 'Risiko bukan sekadar volatiliti',
        paragraphs: [
          'Nama tunggal, tema tunggal, dan leveraj tinggi ialah resipi klasik letupan akaun peribadi. Kepelbagaian bukan membeli dua puluh nama sampah—ia memastikan tiada satu itik hitam boleh hapuskan nilai bersih.',
          '“Kepelbagaian” berkorelasi ialah satu pertaruhan terselubung. Rantaian tenaga baharu all-in kelihatan pelbagai sehingga dasar atau permintaan berpaling dan semuanya jatuh bersama.',
        ],
      },
      {
        heading: 'Saiz kedudukan: masukkan kualiti tidur dalam rancangan',
        paragraphs: [
          'Saiz kedudukan ialah kualiti tidur: bolehkah anda masih laksanakan rancangan melalui penurunan 20% atau 30%? Jika tidak, anda sudah terlalu besar. Kurangkan apabila tidak pasti mengalahkan leveraj untuk “menang balik.”',
          'Tabiat praktikal: had keras setiap tema—cth., tiada nama tunggal melebihi 10% aset, tiada sektor tunggal melebihi 30%. Laras nombor, tetapi tulis dahulu.',
        ],
      },
      {
        heading: 'Empat lapisan risiko dan cara menanganinya',
        paragraphs: [
          'Risiko pasaran: penurunan sistemik. Respons—kawal pendedahan ekuiti keseluruhan, simpan tunai atau aset tidak berkorelasi.',
          'Risiko saham tunggal: asas rosak. Respons—penyelidikan, kepelbagaian, dan disiplin memotong apabila tesis gagal.',
          'Risiko kecairan: tidak boleh jual atau gelinciran besar. Perhatikan small cap, penggantungan, pra/pasca-pasaran.',
          'Risiko tingkah laku: mengejar, jual panik, dagangan balas dendam. Respons—kurangkan masa skrin, senarai dagangan pra-set, elak idea intrahari impulsif.',
        ],
      },
      {
        heading: 'Senarai disiplin minimum',
        paragraphs: [
          'Had setiap nama, had setiap tema, lantai tunai, semakan berkala. Disiplin tidak membuat anda betul setiap masa—ia memastikan anda masih ada esok apabila salah.',
          'Ketidaksepadanan matang ialah pembunuh senyap: bertaruh cerita tiga tahun dengan wang diperlukan minggu depan boleh paksa keluar pada masa terburuk walaupun dalam syarikat bagus.',
          'Sekali lagi: sebut harga dan kandungan di sini untuk pembelajaran, bukan nasihat pelaburan.',
        ],
      },
    ],
  },
  {
    id: 'read-kline',
    title: 'Cara Membaca Lilin: Struktur Dulu, Corak Kemudian',
    category: '技术',
    readMinutes: 21,
    summary:
      'Lilin merekod rundingan harga, bukan ramalan—baca lokasi dan trend sebelum bentuk bar tunggal.',
    sections: [
      {
        heading: 'Apa yang satu lilin katakan',
        paragraphs: [
          'Setiap lilin ada buka, tinggi, rendah, tutup. Badan ialah julat buka ke tutup; sumbu tunjuk tolak dan penolakan intrahari. Warna menodai/menurun hanya bermaksud arah tutup vs. buka—bukan automatik “terus esok.”',
          'Sumbu atas panjang mungkin bermaksud penolakan atau ujian bekalan; sumbu bawah panjang mungkin bermaksud sokongan atau jeda penurunan. Corak tanpa lokasi kurang bermakna.',
        ],
      },
      {
        heading: 'Struktur sebelum keunikan',
        paragraphs: [
          'Banyak lilin bersama membentuk struktur: pullback dalam trend naik, lantunan dalam trend turun, pecahan palsu dalam julat. Pemula tertarik “palu” dan “menelan” tetapi abaikan di mana ia muncul—corak sama boleh bermaksud bertentangan di paras tinggi vs. rendah.',
          'Trend boleh dibantu alat lebih ringkas: adakah tinggi/rendah naik atau turun, adakah purata bergerak setuju? Jawab “trend atau julat?” sebelum pilih strategi.',
        ],
      },
      {
        heading: 'Volum: dimensi kedua, bukan kunci induk',
        paragraphs: [
          'Pecahan volum kadang-kadang bermaksud konsensus, kadang-kadang pengagihan; penurunan senyap mungkin enggan jual atau kecairan kering. Penyimpangan volum-harga perlukan konteks lebih panjang—jangan putuskan pada satu hari.',
          'Definisi volum berbeza mengikut pasaran. Campuran peserta saham-A vs. AS bermaksud “volum berat” tidak boleh dibanding sempurna. Gunakan semula satu playbook volum merentas pasaran dengan berhati-hati.',
        ],
      },
      {
        heading: 'Susunan pembelajaran dan sempadan',
        paragraphs: [
          'Susunan cadangan: mingguan untuk arah → harian untuk struktur → intrahari hanya untuk pelaksanaan. Hingar minit ialah gangguan, bukan kelebihan, untuk kebanyakan pedagang runcit.',
          'Analisis teknikal berkebarangkalian, bukan bola kristal. Ia paling berfungsi dengan asas, saiz, dan konteks makro; pemujaan corak sahaja sering jangkaan negatif.',
          'Jika carta membuat anda dagang berterusan dan menyesal, masalahnya kekurangan kekangan, bukan carta. Potong saiz dan kekerapan sebelum mengejar kesempurnaan teknikal.',
        ],
      },
    ],
  },
  {
    id: 'us-market-guide',
    title: 'Pengenalan Ekuiti AS: Indeks, Mega-Cap, dan Sesi',
    category: '美股',
    readMinutes: 26,
    summary:
      'Fahami Dow, S&P 500, Nasdaq, dan Magnificent Seven sebelum obses pada nama tunggal.',
    sections: [
      {
        heading: 'Tiga penanda aras “pasaran luas”',
        paragraphs: [
          '“Pasaran” AS biasanya digambarkan dengan tiga keluarga indeks: Purata Perindustrian Dow Jones (berwajaran harga, nama lebih sedikit), S&P 500 (berwajaran permodalan, Amerika large-cap), dan penanda aras Nasdaq (berat teknologi/pertumbuhan lebih tinggi; Nasdaq-100 khususnya).',
          'Ketiga-tiga boleh berbeza pada hari sama—itu sering isyarat putaran gaya, bukan “pasaran rosak.” Dow stabil dan Nasdaq turun mungkin bermaksud pertumbuhan sensitif kadar sedang menyesuaikan.',
        ],
      },
      {
        heading: 'Berat mega-cap: peluang dan risiko serentak',
        paragraphs: [
          'Sedekad ini naratif AS berpusat pada teknologi dan platform. Apple, Microsoft, Google, Amazon, Meta, NVIDIA, Tesla, dan rakan mengangkat indeks sekaligus menguatkan penurunan.',
          'Dana indeks secara pasif memegang berat berat pada nama-nama ini; pembeli saham tunggal harus tanya sama ada mereka benar-benar ada kelebihan. Ramai fikir mereka pelbagai tetapi masih menumpu faktor AI/teknologi sama.',
        ],
      },
      {
        heading: 'Sesi dan waktu lanjutan',
        paragraphs: [
          'Waktu biasa AS kira-kira 9:30–16:00 Timur Raya—kira-kira 22:30–05:00 Beijing pada musim sejuk, 21:30–04:00 pada musim panas. Pergerakan pra- dan pasca-pasaran boleh besar sementara kecairan nipis; jurang dan gelinciran biasa.',
          'Pelabur merentas pasaran: mood siang tanah besar tidak dipetakan bersih kepada malam AS. Jurang semalaman biasa—rancang saiz untuk bangun dengan pergerakan besar.',
        ],
      },
      {
        heading: 'Kadar faedah, pendapatan, dan pematuhan',
        paragraphs: [
          'Kadar faedah ialah injap induk penilaian AS. Kenaikan kadar riil sering mencederakan pertumbuhan tempoh panjang paling; kecairan mencukupi memihak tema dan gandaan tinggi. Jejak hasil 10 tahun dan komunikasi Fed mengalahkan skrol kemusnahan.',
          'Musim pendapatan ialah “kejutan cuaca” untuk saham AS. Panduan, belian balik saham, pecahan saham, M&A, dan tuntutan kawal selia menentukan semula harga pantas. Kalendar mengalahkan mengejar tajuk peribadi selepas fakta.',
          'Peringatan pematuhan: saluran broker, ADR vs. saham biasa, cukai dan kos FX semua mengubah pulangan sebenar. Kenal landasan anda sebelum dagang.',
        ],
      },
    ],
  },
  {
    id: 'nvidia-huang',
    title: 'NVIDIA dan Jensen Huang: Playbook untuk Pasaran Menodai Pengiraan',
    category: '案例',
    readMinutes: 28,
    summary:
      'Ucapan utama Huang memberi inspirasi, tetapi pelaburan bermaksud pesanan, kapasiti, persaingan, dan dasar—empat benang berasingan.',
    sections: [
      {
        heading: 'NVIDIA jual lebih daripada cip',
        paragraphs: [
          'NVIDIA (NVDA) menjadi simbol kitaran AI bukan hanya dengan menjual GPU tetapi membundel pengiraan dipercepat, rangkaian, dan perisian (CUDA, dll.) menjadi platform. Huang membingkai peta jalan sebagai revolusi industri: pusat data beralih daripada menyimpan data kepada menghasilkan kecerdasan.',
          'Untuk perniagaan platform soalannya: setinggi mana kos pertukaran, adakah ekosistem menguatkan sendiri? Jika ya, pasaran bayar gandaan lebih tinggi; jika pelanggan beralih ke ASIC atau alternatif, naratif ditentukan semula harga pantas.',
        ],
      },
      {
        heading: 'Tiga pertaruhan di sebalik gandaan tinggi',
        paragraphs: [
          'Pasaran biasanya menilai NVIDIA seolah-olah tiga perkara berlangsung bersama: permintaan latihan/inferens terus berkembang; capex awan dan AI berdaulat mendarat; pesaing tidak boleh ganti sepenuhnya prestasi plus ekosistem tidak lama lagi.',
          'Jika mana-mana pautan melemah, keanjalan besar—itu normal untuk aset jangkaan tinggi. Tugas anda bukan kepercayaan buta tetapi memerhatikan retak pada ketiga-tiga.',
        ],
      },
      {
        heading: 'Cara membaca tajuk Huang',
        paragraphs: [
          'Lapisan maklumat: (1) fakta ditandatangani/dihantar; (2) pandangan permintaan kualitatif; (3) kenyataan persaingan dan kawalan eksport; (4) emosi media. Menganggap (2) dan (4) sebagai (1) ialah yuran pengajian mahal untuk runcit.',
          'Ucapan dan temu bual mengajar arah industri, bukan masuk/keluar. Tukar petikan menjadi metrik boleh dijejak: kadar penghantaran, capex hyperscaler, margin kasar, inventori, masa tunggu.',
        ],
      },
      {
        heading: 'Rantaian bekalan, persaingan, dasar',
        paragraphs: [
          'Fab canggih, pembungkusan lanjutan, HBM, dan modul optik semuanya mengehad penghantaran. Optimisme masih terhenti dinding kapasiti. Sebaliknya, jika bekalan longgar sementara permintaan tahan, margin dan kepastian penghantaran mungkin bertambah baik.',
          'Persaingan termasuk AMD, ASIC awan, dan pemecut lain. Cerita parit sering berehat pada perisian dan pengoptimuman full-stack—pelabur harus semak sama ada pelanggan terkunci atau hanya “terbaik buat masa ini.”',
          'Kawalan eksport membentuk semula atau buang permintaan serantau dan paksa SKU patuh. Itu tidak menamatkan cerita tetapi mengubah pertumbuhan dan campuran—dan model penilaian.',
        ],
      },
      {
        heading: 'Jika anda dagang sekitar ini',
        paragraphs: [
          'Sekurang-kurangnya: had kedudukan, rancangan volatiliti pendapatan, dan “bagaimana jika capex perlahan?” Berita boleh menaikkan harga optimistik; saiz mesti kekal terkawal.',
          'NVIDIA ialah kajian kes hebat—teknologi, rantaian bekalan, dasar, dan jangkaan pasaran dalam satu nama. Kajian kes bukan cadangan. Buat kerja sendiri dan kawal risiko.',
        ],
      },
    ],
  },
  {
    id: 'musk-tesla',
    title: 'Musk dan Tesla: Membongkar Premium Pengasas',
    category: '案例',
    readMinutes: 24,
    summary:
      'Musk menguatkan volatiliti; melabur dalam Tesla masih tertumpu pada penghantaran, keuntungan, dan pelaksanaan.',
    sections: [
      {
        heading: 'Jenama peribadi bermata dua',
        paragraphs: [
          'Musk antara usahawan yang paling menggerakkan pasaran dalam senarai Forbes. Penilaian Tesla sering membenamkan pertaruhan jauh pada autonomi, robotik, dan rangkaian tenaga, serta premium pada pelaksanaan Musk.',
          'Premium bermaksud berita baik membesar pantas—dan kontroversi membesar pantas. Apabila menjejak tajuk Musk, tanya: adakah ini mengubah penghantaran, margin kasar, atau latar kawal selia? Jika tidak, ia kebanyakannya dagangan sentimen.',
        ],
      },
      {
        heading: 'Pisahkan cerita kepada modul boleh diuji',
        paragraphs: [
          'Teras automotif: penghantaran, harga jualan purata, kos, inventori. Itu asas aliran tunai.',
          'Autonomi dan perisian: kemajuan kawal selia, data perbatuan, kesediaan membayar. Cerita panjang; kadar bukti memacu keanjalan penilaian.',
          'Tenaga dan lain-lain: bolehkah storan menjadi lengkung kedua? Sahkan dengan penyata rasmi, bukan tenaga ucapan utama.',
        ],
      },
      {
        heading: 'Disiplin semasa dagang',
        paragraphs: [
          'Membesarkan kedudukan atas satu siaran Musk menukar pelaburan menjadi hiburan. Anda boleh tonton dan bincang—tetapi peraturan kedudukan harus ditetapkan sebelum emosi tiba.',
          'Tesla berayun kuat; sesuai untuk sleeve pembelajaran kecil atau pendekatan trend tertakrif, bukan wang perbelanjaan hidup. Tajuk akan terus datang; akaun anda perlu kekal dalam permainan.',
        ],
      },
    ],
  },
  {
    id: 'how-to-read-news',
    title: 'Cara Membaca Berita Kewangan: Penapis untuk Era Clickbait',
    category: '方法',
    readMinutes: 18,
    summary:
      'Berita ialah input, bukan arahan—peringkatkan dengan baik atau tajuk akan memandu dagangan anda.',
    sections: [
      {
        heading: 'Maklumat empat peringkat',
        paragraphs: [
          'Susun berita kepada: fakta (siapa umum apa), penjelasan (mengapa penting), pendapat (apa kata penganalisis), emosi (adakah pasaran panik atau euforia?). Keputusan harus terutamanya berehat pada fakta dan data boleh disahkan; pendapat hanya rujukan.',
          'Latih diri mencari ayat boleh disemak: jumlah, tarikh, penyata rasmi, angka dilaporkan. Tanpa itu, anggap sebagai hingar latar.',
        ],
      },
      {
        heading: 'Satu lilin merah, lima tajuk',
        paragraphs: [
          '“Ranaplah,” “pembetulan,” “tarik balik sihat,” “pengagihan,” dan “lubang emas” boleh menggambarkan hari turun yang sama. Lihat magnitud, volum, dan sama ada asas berubah sebelum bertindak.',
          'Tajuk berkhidmat klik, bukan akaun anda. “Panel data dulu, tajuk kemudian” jimat yuran pengajian.',
        ],
      },
      {
        heading: 'Jarak betul pada berita peribadi',
        paragraphs: [
          'Untuk tokoh frekuensi tinggi seperti Huang, Musk, atau Powell, kekalkan perspektif: mereka bercerita dengan baik; harga masih diselesaikan pada bekalan, permintaan, dan aliran tunai. Anggap orang sebagai petunjuk; penyata rasmi dan makro sebagai bukti.',
          'Hab “pemimpin Forbes” laman ini membantu anda jejak di satu tempat—bukan untuk mengejar setiap tajuk. Bacaan bertema dengan penapis mengalahkan diputar-putar.',
        ],
      },
      {
        heading: 'Bina menu maklumat anda',
        paragraphs: [
          'Tetapkan beberapa input harian: indeks, kadar faedah, pengumuman pegangan anda; imbas sisanya secara berkelompok. Lebihan maklumat ialah risiko tersendiri.',
          'Semakan mingguan: berita mana menggerakkan keputusan anda? Secara retrospektif, apa yang hingar? Tulis—anda akan lebih tenang bulan depan.',
        ],
      },
    ],
  },
]

export const KNOWLEDGE_MS_BY_ID: Record<string, KnowledgeArticle> = Object.fromEntries(
  KNOWLEDGE_MS.map((a) => [a.id, a]),
)