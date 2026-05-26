function quranTracker() {
            return {
                // Connection state
                connectionStatus: 'connecting',
                supabaseConnected: false,
                connectionTestResult: '',
                connectionTestSuccess: false,
                debugResult: '',
                
                // UI state
                isLoading: true,
                isSaving: false, // 🆕 Flag khusus untuk centang, agar tidak freeze seluruh halaman
                loadingMessage: 'Memuat aplikasi...',
                showAnnouncement: false,
                showEditParticipant: false,
                editingParticipant: { id: null, name: '' },
                lastRefresh: '', // 🆕 Waktu terakhir refresh data
                               
                // Data peserta
                participants: [
                    { id: 1, name: 'Peserta 1' }, { id: 2, name: 'Peserta 2' }, { id: 3, name: 'Peserta 3' }, { id: 4, name: 'Peserta 4' },
                    { id: 5, name: 'Peserta 5' }, { id: 6, name: 'Peserta 6' }, { id: 7, name: 'Peserta 7' }, { id: 8, name: 'Peserta 8' },
                    { id: 9, name: 'Peserta 9' }, { id: 10, name: 'Peserta 10' }, { id: 11, name: 'Peserta 11' }, { id: 12, name: 'Peserta 12' },
                    { id: 13, name: 'Peserta 13' }, { id: 14, name: 'Peserta 14' }, { id: 15, name: 'Peserta 15' }, { id: 16, name: 'Peserta 16' },
                    { id: 17, name: 'Peserta 17' }, { id: 18, name: 'Peserta 18' }, { id: 19, name: 'Peserta 19' }, { id: 20, name: 'Peserta 20' },
                    { id: 21, name: 'Peserta 21' }, { id: 22, name: 'Peserta 22' }, { id: 23, name: 'Peserta 23' }, { id: 24, name: 'Peserta 24' },
                    { id: 25, name: 'Peserta 25' }, { id: 26, name: 'Peserta 26' }, { id: 27, name: 'Peserta 27' }, { id: 28, name: 'Peserta 28' },
                    { id: 29, name: 'Peserta 29' }, { id: 30, name: 'Peserta 30' }
                ],

                // Detail setiap juz
                juzDetails: {
                    1: { name: "Al Fatihah", content: "Al-Fatihah - Al-Baqarah:141", pages: "1-21"},
                    2: { name: " سَيَقُولُ ٱلسُّفَهَآءُ", content: "Al-Baqarah:142-252", pages: "22-41"},
                    3: { name: "۞ تِلْكَ ٱلرُّسُلُ فَضَّلْنَا", content: "Al-Baqarah:253 - Ali Imran:92", pages: "42-61"},
                    4: { name: " كُلُّ ٱلطَّعَامِ", content: "Ali Imran:93 - An-Nisa:23", pages: "62-82"},
                    5: { name: "حُرِّمَتْ عَلَيْكُمْ", content: "An-Nisa:24-147", pages: "82-101"},
                    6: { name: " لَّا يُحِبُّ ٱللَّهُ", content: "An-Nisa:148 - Al-Maidah:81", pages: "101-121"},
                    7: { name: "۞ لَتَجِدَنَّ أَشَدَّ ٱلنَّاسِ", content: "Al-Maidah:82 - Al-An'am:107", pages: "122-141"},
                    8: { name: "وَلَا تَسُبُّوا۟ ٱلَّذِينَ", content: "Al-An'am:108 - Al-A'raf:84", pages: "141-161"},
                    9: { name: "وَإِلَىٰ مَدْيَنَ أَخَاهُمْ", content: "Al-A'raf:85 - Al-Anfal:40", pages: "161-181"},
                    10: { name: "۞ وَٱعْلَمُوٓا۟ أَنَّمَا", content: "Al-Anfal:41 - At-Taubah:89", pages: "182-201"},
                    11: { name: "وَجَآءَ ٱلْمُعَذِّرُونَ", content: "At-Taubah:90 - Yunus:109", pages: "201-221" },
                    12: { name: "الٓر ۚ كِتَـٰبٌ أُحْكِمَتْ", content: "Hud:1 - Yusuf:57", pages: "222-242"},
                    13: { name: "وَجَآءَ إِخْوَةُ يُوسُفَ", content: "Yusuf:58 - Ibrahim:52", pages: "242-261"},
                    14: { name: "الٓر ۚ تِلْكَ ءَايَـٰتُ", content: "Al-Hijr:1 - An-Nahl:128", pages: "262-281"},
                    15: { name: "سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ", content: "Al-Isra:1 - Al-Kahf:82", pages: "281-302"},
                    16: { name: "وَيَسْـَٔلُونَكَ عَن ذِى ٱلْقَرْنَيْنِ ۖ", content: "Al-Kahf:83 - Taha:135", pages: "302-321"},
                    17: { name: "ٱقْتَرَبَ لِلنَّاسِ", content: "Al-Anbiya:1 - Al-Hajj:78", pages: "322-341"},
                    18: { name: "قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ", content: "Al-Mu'minun:1 - Al-Furqan:20", pages: "342-361"},
                    19: { name: "۞ وَقَالَ ٱلَّذِينَ لَا يَرْجُونَ", content: "Al-Furqan:21 - An-Naml:58", pages: "362-382"},
                    20: { name: "قُلِ ٱلْحَمْدُ لِلَّهِ", content: "An-Naml:59 - Al-Ankabut:44", pages: "382-402"},
                    21: { name: "۞ اتْلُ مَا أُوحِيَ إِلَيْكَ", content: "Al-Ankabut:45 - Al-Ahzab:27", pages: "402-422"},
                    22: { name: "يَا أَيُّهَا النَّبِيُّ قُل لِّأَزْوَاجِكَ ", content: "Al-Ahzab:28 - Akhir Fathir", pages: "422-440"},
                    23: { name: "يسٓ ", content: "Yasin:1 - Az-Zumar:31", pages: "440-461"},
                    24: { name: "۞ فَمَنْ أَظْلَمُ مِمَّن كَذَبَ", content: "Az-Zumar:32 - Akhir Fushshilat", pages: "462-482"},
                    25: { name: "حمٓ ", content: "Asy Syura:1 - Al-Jatsiyah:37", pages: "482-502"},
                    26: { name: "حمٓ", content: "Al-Ahqaf:1 - akhir Qof", pages: "502-520"},
                    27: { name: "وَٱلذَّٰرِيَـٰتِ ذَرْوًۭا", content: "Adz-Dzariyat:1 - Al-Hadid:29", pages: "520-541"},
                    28: { name: "قَدْ سَمِعَ ٱللَّهُ", content: "Al-Mujadilah:1 - At-Tahrim:12", pages: "542-561"},
                    29: { name: "تَبَـٰرَكَ ٱلَّذِى", content: "Al-Mulk:1 - Al-Mursalat:50", pages: "562-581"},
                    30: { name: "عَمَّ يَتَسَآءَلُونَ", content: "An-Naba:1 - An-Nas:6", pages: "582-604"}
                },

                // State management
                activeTab: 'checklist',
                currentMotivation: '',
                motivations: [],
                selectedDate: '',
                todayChecks: {},
                monthlyData: {}, // Format: { "2025-07": { participantChecks: { 1: ["2025-07-01", "2025-07-02"], 2: [...] }, khatamDays: ["2025-07-01"] } }
                
                selectedMonth: '',
                availableMonths: [],
                
                // Admin
                isAdmin: false,
                showAdminLogin: false,
                adminCredentials: { username: '', password: '' },
                adminError: '',
                exportText: '',
                
                // Program start date
                programStartDate: new Date('2025-07-01'),

                async init() {
                    console.log('🚀 Starting One Day One Juz App...');
                    this.loadMotivations();
                    this.loadingMessage = 'Memulai aplikasi...';
                    
                    try {
                        this.loadingMessage = 'Bismillaah...';
                        await this.testSupabaseConnectionInit();
                        
                        if (this.supabaseConnected) {
                            this.loadingMessage = 'Memuat data...';
                            await this.loadDataFromSupabase();
                            this.connectionStatus = 'online';
                            // 🆕 Set waktu refresh pertama
                            this.lastRefresh = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
                            console.log('✅ Supabase mode activated');
                        } else {
                            this.loadingMessage = 'Mode offline - memuat data lokal...';
                            this.connectionStatus = 'offline';
                            this.loadDataFromLocal();
                            console.log('📱 Offline mode activated');
                            // 🆕 Peringatan saat fallback offline
                            setTimeout(() => {
                                alert('⚠️ Koneksi ke server gagal. Aplikasi berjalan dalam mode OFFLINE.\n\nData centang mungkin tidak tersinkron. Pastikan internet stabil lalu refresh halaman.');
                            }, 1000);
                        }
                        
                    } catch (error) {
                        console.log('🟠 Falling back to offline mode:', error.message);
                        this.connectionStatus = 'offline';
                        this.supabaseConnected = false;
                        this.loadDataFromLocal();
                        // 🆕 Peringatan saat fallback offline karena error
                        setTimeout(() => {
                            alert('⚠️ Koneksi ke server gagal. Aplikasi berjalan dalam mode OFFLINE.\n\nData centang mungkin tidak tersinkron. Pastikan internet stabil lalu refresh halaman.');
                        }, 1000);
                    }
                    
                    this.loadingMessage = 'Menyiapkan pengumuman...';
                    this.checkAnnouncementStatus();
                    
                    this.loadingMessage = 'Menyiapkan data bulanan...';
                    this.generateAvailableMonths();
                    this.selectedMonth = this.getCurrentMonth();
                    this.selectedDate = this.getTodayKey();
                    
                    this.loadingMessage = 'Menginisialisasi struktur data bulanan...';
                    this.initializeMonthlyData();
                    
                    this.loadingMessage = 'Menyelesaikan setup...';
                    await this.delay(500);
                    
                    this.isLoading = false;
                    console.log('✅ App loaded successfully');
                },

                delay(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                },

                async testSupabaseConnectionInit() {
                    try {
                        let attempts = 0;
                        while (!window.supabaseClient && attempts < 20) {
                            await this.delay(100);
                            attempts++;
                        }
                        
                        if (!window.supabaseClient) {
                            throw new Error('Supabase client not initialized');
                        }
                        
                        console.log('🧪 Testing Supabase connection...');
                        
                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Connection timeout (5s)')), 5000)
                        );
                        
                        const testPromise = window.supabaseClient
                            .from('participants')
                            .select('count')
                            .limit(1);
                        
                        const { data, error } = await Promise.race([testPromise, timeoutPromise]);
                        
                        if (error) {
                            throw new Error(`Supabase test failed: ${error.message}`);
                        }
                        
                        this.supabaseConnected = true;
                        console.log('✅ Supabase connection successful');
                        return true;
                        
                    } catch (error) {
                        console.log('❌ Supabase connection failed:', error.message);
                        this.supabaseConnected = false;
                        throw error;
                    }
                },

                async testSupabaseConnection() {
                    this.connectionTestResult = '';
                    this.connectionTestSuccess = false;
                    
                    try {
                        if (!window.supabaseClient) {
                            throw new Error('Supabase client tidak tersedia. Periksa konfigurasi.');
                        }
                        
                        console.log('🧪 Manual testing Supabase connection...');
                        
                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Timeout setelah 10 detik')), 10000)
                        );
                        
                        const testPromise = window.supabaseClient
                            .from('participants')
                            .select('count')
                            .limit(1);
                        
                        const { data, error } = await Promise.race([testPromise, timeoutPromise]);
                        
                        if (error) {
                            throw new Error(`Database error: ${error.message}`);
                        }
                        
                        const { error: writeError } = await window.supabaseClient
                            .from('daily_checks')
                            .select('count')
                            .limit(1);
                            
                        if (writeError) {
                            console.warn('Write test warning:', writeError.message);
                        }
                        
                        this.connectionTestResult = '✅ Koneksi Supabase berhasil! Database dapat diakses.';
                        this.connectionTestSuccess = true;
                        this.supabaseConnected = true;
                        this.connectionStatus = 'online';
                        
                    } catch (error) {
                        console.error('❌ Connection test failed:', error);
                        this.connectionTestResult = `❌ Koneksi gagal: ${error.message}`;
                        this.connectionTestSuccess = false;
                        this.supabaseConnected = false;
                        this.connectionStatus = 'offline';
                    }
                },

                async loadDataFromSupabase() {
                    try {
                        console.log('📥 Loading data from Supabase...');
                        
                        const { data: participants, error: participantsError } = await window.supabaseClient
                            .from('participants')
                            .select('*')
                            .order('id');
                            
                        if (participantsError) {
                            console.warn('Participants load warning:', participantsError);
                        } else if (participants && participants.length > 0) {
                            this.participants = participants;
                            console.log('✅ Participants loaded:', participants.length);
                        }

                        let allChecks = [];
                        let from = 0;
                        const pageSize = 1000;

                        while (true) {
                            const { data, error } = await window.supabaseClient
                                .from('daily_checks')
                                .select('participant_id, check_date')
                                .order('check_date', { ascending: true })
                                .range(from, from + pageSize - 1);
                            
                            if (error) { console.warn('All checks load warning:', error); break; }
                            if (!data || data.length === 0) break;
                            
                            allChecks = allChecks.concat(data);
                            console.log(`📥 Fetched ${allChecks.length} records...`);
                            
                            if (data.length < pageSize) break;
                            from += pageSize;
                        }

                        if (allChecks.length > 0) {
                            this.todayChecks = {};
                            this.monthlyData = {};
                            
                            console.log('🔄 Reconstructing data from', allChecks.length, 'records...');
                            
                            allChecks.forEach(check => {
                                const checkDate = check.check_date;
                                // 🔧 FIX: Paksa konversi ke Number agar tidak ada type mismatch
                                const participantId = Number(check.participant_id);
                                const monthKey = checkDate.slice(0, 7);
                                
                                if (!this.todayChecks[checkDate]) {
                                    this.todayChecks[checkDate] = [];
                                }
                                if (!this.todayChecks[checkDate].includes(participantId)) {
                                    this.todayChecks[checkDate].push(participantId);
                                }
                                
                                if (!this.monthlyData[monthKey]) {
                                    this.monthlyData[monthKey] = {
                                        participantChecks: {},
                                        khatamDays: []
                                    };
                                }
                                
                                if (!this.monthlyData[monthKey].participantChecks[participantId]) {
                                    this.monthlyData[monthKey].participantChecks[participantId] = [];
                                }
                                
                                if (!this.monthlyData[monthKey].participantChecks[participantId].includes(checkDate)) {
                                    this.monthlyData[monthKey].participantChecks[participantId].push(checkDate);
                                }
                            });
                            
                            console.log('✅ All checks loaded and reconstructed:', allChecks.length);
                        }

                        const { data: monthlyRecords, error: monthlyError } = await window.supabaseClient
                            .from('monthly_records')
                            .select('*')
                            .eq('is_khatam', true);
                            
                        if (monthlyError) {
                            console.warn('Monthly records load warning:', monthlyError);
                        } else if (monthlyRecords) {
                            monthlyRecords.forEach(record => {
                                const monthKey = record.month;
                                if (!this.monthlyData[monthKey]) {
                                    this.monthlyData[monthKey] = {
                                        participantChecks: {},
                                        khatamDays: []
                                    };
                                }
                                
                                if (!this.monthlyData[monthKey].khatamDays.includes(record.check_date)) {
                                    this.monthlyData[monthKey].khatamDays.push(record.check_date);
                                }
                            });
                            console.log('✅ Khatam days loaded');
                        }

                        console.log('✅ All data loaded from Supabase successfully');
                        console.log('📊 Monthly data structure:', this.monthlyData);
                        
                    } catch (error) {
                        console.error('❌ Error loading data from Supabase:', error);
                        throw error;
                    }
                },

                loadDataFromLocal() {
                    try {
                        console.log('📦 Loading data from localStorage...');
                        
                        const todayChecks = localStorage.getItem('quranTrackerTodayChecks');
                        if (todayChecks) {
                            this.todayChecks = JSON.parse(todayChecks);
                        }
                        
                        const monthlyData = localStorage.getItem('quranTrackerMonthlyData');
                        if (monthlyData) {
                            this.monthlyData = JSON.parse(monthlyData);
                        }
                        
                        const participants = localStorage.getItem('quranTrackerParticipants');
                        if (participants) {
                            this.participants = JSON.parse(participants);
                        }
                        
                        console.log('✅ Local data loaded successfully');
                        
                    } catch (error) {
                        console.error('❌ Error loading local data:', error);
                        this.todayChecks = {};
                        this.monthlyData = {};
                    }
                },

                initializeMonthlyData() {
                    const currentMonth = this.getCurrentMonth();
                    
                    if (!this.monthlyData[currentMonth]) {
                        this.monthlyData[currentMonth] = {
                            participantChecks: {},
                            khatamDays: []
                        };
                        
                        this.participants.forEach(participant => {
                            this.monthlyData[currentMonth].participantChecks[participant.id] = [];
                        });
                    }
                    
                    console.log('📊 Monthly data initialized for', currentMonth);
                },

                checkAnnouncementStatus() {
                    const today = this.getTodayKey();
                    const lastSeen = localStorage.getItem('announcementLastSeen');
                    
                    if (lastSeen !== today) {
                        this.showAnnouncement = true;
                    }
                },

                closeAnnouncement() {
                    this.showAnnouncement = false;
                    const today = this.getTodayKey();
                    localStorage.setItem('announcementLastSeen', today);
                },

                editParticipant(participant) {
                    this.editingParticipant = { ...participant };
                    this.showEditParticipant = true;
                },

                async saveParticipantName() {
                    if (!this.editingParticipant.name.trim()) {
                        alert('Nama peserta tidak boleh kosong!');
                        return;
                    }
                    
                    const index = this.participants.findIndex(p => p.id === this.editingParticipant.id);
                    if (index !== -1) {
                        this.participants[index].name = this.editingParticipant.name.trim();
                        
                        if (this.supabaseConnected) {
                            try {
                                const { error } = await window.supabaseClient
                                    .from('participants')
                                    .update({ name: this.editingParticipant.name.trim() })
                                    .eq('id', this.editingParticipant.id);
                                    
                                if (error) throw error;
                                console.log('✅ Participant name updated in Supabase');
                            } catch (error) {
                                console.error('Error updating participant:', error);
                                alert('Gagal menyimpan ke server, tersimpan di local saja');
                            }
                        }
                        
                        this.saveData();
                        this.showEditParticipant = false;
                        this.editingParticipant = { id: null, name: '' };
                    }
                },

                quickEditParticipant(participant) {
                    this.editParticipant(participant);
                },

                async updateParticipantName(participantId, newName) {
                    const trimmedName = newName.trim();
                    
                    if (!trimmedName) {
                        alert('❌ Nama peserta tidak boleh kosong!');
                        location.reload();
                        return;
                    }
                    
                    const index = this.participants.findIndex(p => p.id === participantId);
                    if (index !== -1) {
                        const oldName = this.participants[index].name;
                        
                        if (oldName === trimmedName) {
                            return;
                        }
                        
                        this.participants[index].name = trimmedName;
                        
                        this.isLoading = true;
                        this.loadingMessage = 'Menyimpan perubahan...';
                        
                        try {
                            if (this.supabaseConnected) {
                                const { error } = await window.supabaseClient
                                    .from('participants')
                                    .update({ name: trimmedName })
                                    .eq('id', participantId);
                                    
                                if (error) throw error;
                                console.log('✅ Participant name updated in Supabase');
                            }
                            
                            this.saveData();
                            alert(`✅ Nama berhasil diubah!\n\nDari: ${oldName}\nJadi: ${trimmedName}`);
                            
                        } catch (error) {
                            console.error('Error updating participant:', error);
                            alert('⚠️ Gagal menyimpan ke server, tersimpan di local saja');
                            this.saveData();
                        }
                        
                        this.isLoading = false;
                    }
                },

                getCurrentDate() {
                    return new Intl.DateTimeFormat('id-ID', {
                        timeZone: 'Asia/Jakarta',
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).format(new Date());
                },

                getCurrentMonth() {
                    return new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit'
                    }).format(new Date());
                },

                getTodayKey() {
                    return new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(new Date());
                },

                getYesterdayKey() {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(yesterday);
                },

                getPreviousDate(dateKey) {
                    const date = new Date(dateKey);
                    date.setDate(date.getDate() - 1);
                    return new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(date);
                },

                getNextDate(dateKey) {
                    const date = new Date(dateKey);
                    date.setDate(date.getDate() + 1);
                    const today = this.getTodayKey();
                    const nextDate = new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(date);
                    
                    if (nextDate > today) return today;
                    return nextDate;
                },

                canGoNext() {
                    return this.selectedDate < this.getTodayKey();
                },

                goToToday() {
                    this.selectedDate = this.getTodayKey();
                },

                goToProgramStart() {
                    this.selectedDate = '2025-07-01';
                },

                goBackDays(days) {
                    const date = new Date(this.selectedDate);
                    date.setDate(date.getDate() - days);
                    this.selectedDate = new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(date);
                },

                formatDateLabel(dateKey) {
                    if (dateKey === this.getTodayKey()) return 'Hari Ini';
                    if (dateKey === this.getYesterdayKey()) return 'Kemarin';
                    
                    const date = new Date(dateKey);
                    return date.toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                    });
                },

                getDaysInMonth(monthString = null) {
                    const targetMonth = monthString || this.selectedMonth;
                    if (!targetMonth) return 31;
                    const [year, month] = targetMonth.split('-');
                    return new Date(year, month, 0).getDate();
                },

                // 🔧 FIX: Amankan dari bug UTC — baca string YYYY-MM-DD sebagai waktu lokal
                getDaysSinceStart() {
                    const targetDateKey = this.selectedDate || this.getTodayKey();
                    
                    // Pecah string agar dibaca sebagai tanggal lokal, bukan UTC tengah malam
                    const [year, month, day] = targetDateKey.split('-').map(Number);
                    const targetDate = new Date(year, month - 1, day);
                    
                    const programStart = new Date(2025, 6, 1); // 2025-07-01 (month 0-indexed)
                    
                    const diffTime = targetDate - programStart;
                    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
                },

                getRotatedParticipants() {
                    const daysSinceStart = this.getDaysSinceStart();
                    const rotated = [...this.participants];
                    
                    for (let i = 0; i < daysSinceStart % 30; i++) {
                        rotated.unshift(rotated.pop());
                    }
                    
                    return rotated;
                },

                getJuzDetails(juzNumber) {
                    return this.juzDetails[juzNumber] || { 
                        name: 'Unknown', 
                        content: 'Unknown', 
                        pages: 'Unknown',
                    };
                },

                isCompleted(participantId) {
                    const targetDate = this.selectedDate || this.getTodayKey();
                    return this.todayChecks[targetDate]?.includes(participantId) || false;
                },

                // 🔧 FIXED: Pessimistic update + isSaving flag + upsert + retry
                async toggleCheck(participantId) {
                    // 🔒 Cegah klik ganda
                    if (this.isSaving) return;

                    // 🔒 Blokir centang saat offline
                    if (!this.supabaseConnected) {
                        alert('⚠️ Anda sedang offline. Fitur centang dinonaktifkan sementara hingga internet kembali online.');
                        return;
                    }

                    const targetDate = this.selectedDate || this.getTodayKey();
                    const currentMonth = targetDate.slice(0, 7);

                    if (!this.todayChecks[targetDate]) this.todayChecks[targetDate] = [];
                    const index = this.todayChecks[targetDate].indexOf(participantId);
                    const isCurrentlyChecked = index > -1;

                    // 🔒 Aktifkan flag saving (bukan isLoading agar halaman tidak freeze)
                    this.isSaving = true;

                    try {
                        if (isCurrentlyChecked) {
                            // --- HAPUS dari Supabase dulu ---
                            const { error } = await window.supabaseClient
                                .from('daily_checks')
                                .delete()
                                .eq('participant_id', participantId)
                                .eq('check_date', targetDate);

                            if (error) throw error;

                        } else {
                            // --- INSERT ke Supabase dulu (upsert agar aman dari duplicate) ---
                            const tryUpsert = async (attempt = 1) => {
                                const { error } = await window.supabaseClient
                                    .from('daily_checks')
                                    .upsert(
                                        { participant_id: participantId, check_date: targetDate },
                                        { onConflict: 'participant_id,check_date' }
                                    );
                                // Retry 1x jika gagal
                                if (error && attempt < 2) {
                                    console.warn(`⚠️ Upsert gagal, retry ke-${attempt}...`);
                                    await this.delay(1000);
                                    return tryUpsert(attempt + 1);
                                }
                                if (error) throw error;
                            };
                            await tryUpsert();
                        }

                        // ✅ SERVER SUKSES — baru update state lokal
                        if (!this.monthlyData[currentMonth]) {
                            this.monthlyData[currentMonth] = { participantChecks: {}, khatamDays: [] };
                        }
                        if (!this.monthlyData[currentMonth].participantChecks[participantId]) {
                            this.monthlyData[currentMonth].participantChecks[participantId] = [];
                        }

                        if (isCurrentlyChecked) {
                            // Hapus dari state lokal
                            this.todayChecks[targetDate].splice(index, 1);
                            const mIndex = this.monthlyData[currentMonth].participantChecks[participantId].indexOf(targetDate);
                            if (mIndex > -1) this.monthlyData[currentMonth].participantChecks[participantId].splice(mIndex, 1);
                        } else {
                            // Tambah ke state lokal
                            this.todayChecks[targetDate].push(participantId);
                            if (!this.monthlyData[currentMonth].participantChecks[participantId].includes(targetDate)) {
                                this.monthlyData[currentMonth].participantChecks[participantId].push(targetDate);
                                this.monthlyData[currentMonth].participantChecks[participantId].sort();
                            }
                        }

                        this.updateKhatamStatus(targetDate, currentMonth);
                        this.saveData(); // Backup ke localStorage

                        console.log('✅ Toggle complete:', { participantId, targetDate, isCurrentlyChecked });

                    } catch (error) {
                        console.error('❌ Supabase sync failed:', error);
                        alert('❌ Gagal menyimpan! Koneksi internet tidak stabil. Halaman akan memuat ulang data dari server.');
                        // Ambil data ulang dari server agar tampilan tidak menipu user
                        await this.loadDataFromSupabase();
                    } finally {
                        this.isSaving = false;
                    }
                },

                updateKhatamStatus(date, month) {
                    const completedCount = this.todayChecks[date]?.length || 0;
                    const khatamDays = this.monthlyData[month].khatamDays;
                    const isKhatamDay = khatamDays.includes(date);
                    
                    if (completedCount === 30 && !isKhatamDay) {
                        khatamDays.push(date);
                        
                        if (this.supabaseConnected) {
                            window.supabaseClient
                                .from('monthly_records')
                                .upsert({
                                    month: month,
                                    check_date: date,
                                    participant_id: null,
                                    is_khatam: true
                                })
                                .then(({ error }) => {
                                    if (error) console.error('Error saving khatam status:', error);
                                });
                        }
                        
                    } else if (completedCount < 30 && isKhatamDay) {
                        const index = khatamDays.indexOf(date);
                        if (index > -1) {
                            khatamDays.splice(index, 1);
                        }
                        
                        if (this.supabaseConnected) {
                            window.supabaseClient
                                .from('monthly_records')
                                .delete()
                                .eq('month', month)
                                .eq('check_date', date)
                                .eq('is_khatam', true)
                                .then(({ error }) => {
                                    if (error) console.error('Error removing khatam status:', error);
                                });
                        }
                    }
                },

                getTodayCompleted() {
                    const targetDate = this.selectedDate || this.getTodayKey();
                    return this.todayChecks[targetDate]?.length || 0;
                },

                generateAvailableMonths() {
                    const months = [];
                    const currentDate = new Date();
                    const startDate = new Date('2025-07-01');
                    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 1);
                    
                    let tempDate = new Date(startDate);
                    while (tempDate <= endDate) {
                        const monthKey = tempDate.toISOString().slice(0, 7);
                        const monthLabel = tempDate.toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long' 
                        });
                        
                        months.push({ value: monthKey, label: monthLabel });
                        tempDate.setMonth(tempDate.getMonth() + 1);
                    }
                    
                    this.availableMonths = months;
                },

                updateMonthlyView() {
                    if (!this.monthlyData[this.selectedMonth]) {
                        this.monthlyData[this.selectedMonth] = {
                            participantChecks: {},
                            khatamDays: []
                        };
                        
                        this.participants.forEach(participant => {
                            this.monthlyData[this.selectedMonth].participantChecks[participant.id] = [];
                        });
                    }
                },

                getParticipantMonthlyCount(participantId) {
                    const monthData = this.monthlyData[this.selectedMonth];
                    if (!monthData || !monthData.participantChecks[participantId]) {
                        return 0;
                    }
                    return monthData.participantChecks[participantId].length;
                },

                getMonthlyKhatam() {
                    const monthData = this.monthlyData[this.selectedMonth];
                    return monthData ? monthData.khatamDays.length : 0;
                },

                getTotalMonthlyChecks() {
                    const monthData = this.monthlyData[this.selectedMonth];
                    if (!monthData) return 0;
                    
                    let total = 0;
                    Object.values(monthData.participantChecks).forEach(checks => {
                        total += checks.length;
                    });
                    return total;
                },

                getSortedParticipants() {
                    const sorted = [...this.participants];
                    
                    sorted.sort((a, b) => {
                        const countA = this.getParticipantMonthlyCount(a.id);
                        const countB = this.getParticipantMonthlyCount(b.id);
                        
                        if (countB === countA) {
                            return a.name.localeCompare(b.name);
                        }
                        
                        return countB - countA;
                    });
                    
                    return sorted;
                },

                getParticipantKhatamCount(participantId) {
                    const allDates = new Set();
                    
                    Object.values(this.monthlyData).forEach(monthData => {
                        const checks = monthData.participantChecks?.[participantId] || [];
                        checks.forEach(date => allDates.add(date));
                    });
                    
                    if (allDates.size === 0) return 0;
                    
                    const startDate = new Date(2025, 6, 1);
                    const today = new Date(this.getTodayKey());
                    
                    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
                    
                    let khatamCount = 0;
                    
                    for (let cycleStart = 0; cycleStart < totalDays; cycleStart += 30) {
                        const cycleEnd = Math.min(cycleStart + 29, totalDays - 1);
                        
                        if (cycleEnd - cycleStart < 29) break;
                        
                        let cycleComplete = true;
                        
                        for (let dayOffset = cycleStart; dayOffset <= cycleEnd; dayOffset++) {
                            const date = new Date(2025, 6, 1);
                            date.setDate(date.getDate() + dayOffset);
                            const dateKey = new Intl.DateTimeFormat('sv-SE', {
                                timeZone: 'Asia/Jakarta',
                                year: 'numeric', month: '2-digit', day: '2-digit'
                            }).format(date);
                            
                            if (!allDates.has(dateKey)) {
                                cycleComplete = false;
                                break;
                            }
                        }
                        
                        if (cycleComplete) khatamCount++;
                    }
                    
                    return khatamCount;
                },

                async loadMotivations() {
                    try {
                        const response = await fetch('motivasi.json');
                        if (!response.ok) throw new Error('Gagal load motivasi');
                        
                        this.motivations = await response.json();
                        this.randomizeMotivation();
                    } catch (error) {
                        console.log('Menggunakan motivasi default', error);
                        this.currentMotivation = '"Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya."';
                    }
                },

                randomizeMotivation() {
                    if (this.motivations.length > 0) {
                        const randomIndex = Math.floor(Math.random() * this.motivations.length);
                        this.currentMotivation = this.motivations[randomIndex];
                    }
                },

                async saveData() {
                    try {
                        localStorage.setItem('quranTrackerTodayChecks', JSON.stringify(this.todayChecks));
                        localStorage.setItem('quranTrackerMonthlyData', JSON.stringify(this.monthlyData));
                        localStorage.setItem('quranTrackerParticipants', JSON.stringify(this.participants));
                        console.log('✅ Data saved to localStorage');
                    } catch (error) {
                        console.error('Error saving to localStorage:', error);
                    }
                },

                // 🆕 Refresh data dari server tanpa reload halaman
                async refreshData() {
                    if (!this.supabaseConnected) {
                        alert('❌ Tidak terhubung ke server. Periksa koneksi internet Anda.');
                        return;
                    }
                    this.isLoading = true;
                    this.loadingMessage = 'Mengambil data terbaru dari server...';
                    try {
                        await this.loadDataFromSupabase();
                        this.lastRefresh = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
                        console.log('✅ Data refreshed at', this.lastRefresh);
                    } catch(e) {
                        alert('❌ Gagal refresh data: ' + e.message);
                    } finally {
                        this.isLoading = false;
                    }
                },

                debugMonthlyData() {
                    const currentMonth = this.getCurrentMonth();
                    const today = this.getTodayKey();
                    
                    let debugInfo = '🔍 DEBUG MONTHLY DATA:\n\n';
                    debugInfo += `Current month: ${currentMonth}\n`;
                    debugInfo += `Today: ${today}\n`;
                    debugInfo += `Today completed: ${this.getTodayCompleted()}\n\n`;
                    debugInfo += 'Monthly data structure:\n';
                    debugInfo += JSON.stringify(this.monthlyData, null, 2) + '\n\n';
                    debugInfo += 'Today checks:\n';
                    debugInfo += JSON.stringify(this.todayChecks, null, 2) + '\n\n';
                    debugInfo += 'Sample participant checks:\n';
                    if (this.monthlyData[currentMonth] && this.monthlyData[currentMonth].participantChecks[1]) {
                        debugInfo += `Participant 1: ${JSON.stringify(this.monthlyData[currentMonth].participantChecks[1])}\n`;
                    }
                    if (this.monthlyData[currentMonth] && this.monthlyData[currentMonth].participantChecks[2]) {
                        debugInfo += `Participant 2: ${JSON.stringify(this.monthlyData[currentMonth].participantChecks[2])}\n`;
                    }
                    debugInfo += `\nSupabase connected: ${this.supabaseConnected}\n`;
                    debugInfo += `Connection status: ${this.connectionStatus}`;
                    
                    this.debugResult = debugInfo;
                    console.log(debugInfo);
                },

                async forceSyncAllData() {
                    if (!this.supabaseConnected) {
                        alert('❌ Supabase tidak terhubung');
                        return;
                    }
                    
                    this.isLoading = true;
                    this.loadingMessage = 'Force syncing all data...';
                    
                    try {
                        let syncCount = 0;
                        for (const [date, participantIds] of Object.entries(this.todayChecks)) {
                            for (const participantId of participantIds) {
                                await window.supabaseClient
                                    .from('daily_checks')
                                    .upsert(
                                        { participant_id: participantId, check_date: date },
                                        { onConflict: 'participant_id,check_date' }
                                    );
                                syncCount++;
                            }
                        }
                        
                        let khatamCount = 0;
                        for (const [monthKey, monthData] of Object.entries(this.monthlyData)) {
                            for (const khatamDate of monthData.khatamDays) {
                                await window.supabaseClient
                                    .from('monthly_records')
                                    .upsert({
                                        month: monthKey,
                                        check_date: khatamDate,
                                        participant_id: null,
                                        is_khatam: true
                                    });
                                khatamCount++;
                            }
                        }
                        
                        alert(`✅ Force sync selesai!\n\nSynced ${syncCount} checks\nSynced ${khatamCount} khatam days`);
                        
                    } catch (error) {
                        console.error('❌ Force sync failed:', error);
                        alert('❌ Force sync gagal: ' + error.message);
                    }
                    
                    this.isLoading = false;
                },

                adminLogin() {
                    if (this.adminCredentials.password === 'odojqu') {
                        this.isAdmin = true;
                        this.showAdminLogin = false;
                        this.adminError = '';
                        this.adminCredentials = { password: '' };
                    } else {
                        this.adminError = 'Password salah!';
                    }
                },

                logout() {
                    this.isAdmin = false;
                    this.activeTab = 'checklist';
                },

                generateWhatsAppExport() {
                    const dateStr = new Date().toLocaleDateString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const timeStr = new Date().toLocaleTimeString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    
                    const rotatedParticipants = this.getRotatedParticipants();
                    const completedParticipants = [];
                    const pendingParticipants = [];
                    const exportMonth = (this.selectedDate || this.getTodayKey()).slice(0, 7); //
                    
                    rotatedParticipants.forEach((participant, index) => {
                        const juzNumber = index + 1;
                        const juzDetail = this.getJuzDetails(juzNumber);
                        const isCompleted = this.isCompleted(participant.id);
                        
                        const participantInfo = {
                            id: participant.id,
                            name: participant.name,
                            juz: juzNumber,
                            juzName: juzDetail.name,
                            content: juzDetail.content,
                            status: isCompleted ? '✅' : '⏳'
                        };
                        
                        if (isCompleted) {
                            completedParticipants.push(participantInfo);
                        } else {
                            pendingParticipants.push(participantInfo);
                        }
                    });

                    // Sort berdasarkan centang bulan ini (terbanyak di atas)
                    completedParticipants.sort((a, b) => {
                        const countA = this.monthlyData[exportMonth]?.participantChecks?.[a.id]?.length || 0;
                        const countB = this.monthlyData[exportMonth]?.participantChecks?.[b.id]?.length || 0;
                        return countB - countA;
                    });
                    pendingParticipants.sort((a, b) => {
                        const countA = this.monthlyData[exportMonth]?.participantChecks?.[a.id]?.length || 0;
                        const countB = this.monthlyData[exportMonth]?.participantChecks?.[b.id]?.length || 0;
                        return countB - countA;
                    });
                    let exportText = `*BISMILLAH ISTIQOMAH ONE DAY ONE JUZ*\n`;
                    exportText += `${dateStr}\n`;
                    exportText += `Update: ${timeStr} WIB\n`;
                    exportText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                    
                    if (completedParticipants.length === 30) {
                        exportText += `*ALHAMDULILLAH KHATAM HARI INI!* \n`;
                    }
                    
                    exportText += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                    
                    if (completedParticipants.length > 0) {
                        exportText += `*SUDAH SELESAI (${completedParticipants.length})*\n`;
                        completedParticipants.forEach(p => {
                            const monthData = this.monthlyData[exportMonth];
const total = monthData?.participantChecks?.[p.id]?.length || 0;
                            exportText += ` ${p.name} - Juz ${p.juz} (${total}x bulan ini)\n`;
                        });
                        exportText += `\n`;
                    }
                    
                    if (pendingParticipants.length > 0) {
                        exportText += `*BELUM SELESAI (${pendingParticipants.length})*\n`;
                        pendingParticipants.forEach(p => {
                            const monthData = this.monthlyData[exportMonth];
const total = monthData?.participantChecks?.[p.id]?.length || 0;
                            exportText += ` ${p.name} - Juz ${p.juz} (${total}x bulan ini)\n`;
                        });
                    }
                    
                    exportText += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                    exportText += `💝 Semoga Allah mudahkan kita semua dalam membaca Al-Qur'an\n`;
                    exportText += `🤲 Barakallahu fiikum\n\n`;
                    
                    this.exportText = exportText;
                },

                quickExportAndCopy() {
                    this.generateWhatsAppExport();
                    
                    this.$nextTick(() => {
                        this.copyToClipboard();
                    });
                },

                copyToClipboard() {
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(this.exportText).then(() => {
                            alert('✅ Data berhasil di-copy! Sekarang paste ke WhatsApp grup.');
                        }).catch(() => {
                            this.fallbackCopy();
                        });
                    } else {
                        this.fallbackCopy();
                    }
                },

                fallbackCopy() {
                    const textArea = document.createElement('textarea');
                    textArea.value = this.exportText;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        alert('✅ Data berhasil di-copy! Sekarang paste ke WhatsApp grup.');
                    } catch (err) {
                        alert('❌ Gagal copy. Silakan copy manual dari text box.');
                    }
                    document.body.removeChild(textArea);
                },

                resetSystem() {
                    if (!confirm('⚠️ PERINGATAN! Ini akan menghapus semua data progress.\n\nApakah Anda yakin?')) {
                        return;
                    }

                    if (!confirm('🚨 KONFIRMASI TERAKHIR! Semua data akan hilang!\n\nLanjutkan reset?')) {
                        return;
                    }

                    this.isLoading = true;

                    try {
                        this.todayChecks = {};
                        this.monthlyData = {};
                        this.exportText = '';
                        this.debugResult = '';

                        this.participants = [
                            { id: 1, name: 'Ahmad' }, { id: 2, name: 'Fatimah' }, { id: 3, name: 'Abdullah' }, { id: 4, name: 'Khadijah' },
                            { id: 5, name: 'Umar' }, { id: 6, name: 'Aisha' }, { id: 7, name: 'Ali' }, { id: 8, name: 'Zainab' },
                            { id: 9, name: 'Yusuf' }, { id: 10, name: 'Maryam' }, { id: 11, name: 'Ibrahim' }, { id: 12, name: 'Hafsa' },
                            { id: 13, name: 'Khalid' }, { id: 14, name: 'Ruqayyah' }, { id: 15, name: 'Hamza' }, { id: 16, name: 'Ummu Kulthum' },
                            { id: 17, name: 'Bilal' }, { id: 18, name: 'Safiyyah' }, { id: 19, name: 'Salman' }, { id: 20, name: 'Sawdah' },
                            { id: 21, name: 'Talhah' }, { id: 22, name: 'Maymunah' }, { id: 23, name: 'Zaid' }, { id: 24, name: 'Juwayriyyah' },
                            { id: 25, name: 'Anas' }, { id: 26, name: 'Zaynab bint Jahsh' }, { id: 27, name: 'Mu\'adh' }, { id: 28, name: 'Ramlah' },
                            { id: 29, name: 'Sa\'d' }, { id: 30, name: 'Habibah' }
                        ];

                        localStorage.removeItem('quranTrackerTodayChecks');
                        localStorage.removeItem('quranTrackerMonthlyData');
                        localStorage.removeItem('quranTrackerParticipants');
                        localStorage.removeItem('announcementLastSeen');

                        alert('✅ Sistem berhasil direset! Halaman akan dimuat ulang.');
                        location.reload();
                        
                    } catch (error) {
                        console.error('Error resetting system:', error);
                        alert('❌ Terjadi kesalahan saat reset sistem.');
                    }
                    
                    this.isLoading = false;
                }
            }
        }
