
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
                loadingMessage: 'Memuat aplikasi...',
                showAnnouncement: false,
                showEditParticipant: false,
                editingParticipant: { id: null, name: '' },
                
                // Supabase credentials (for debugging)
                SUPABASE_URL: 'https://avbfccjifnptszchabjh.supabase.co',
                SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YmZjY2ppZm5wdHN6Y2hhYmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTQyODMsImV4cCI6MjA2NzI3MDI4M30.Al8QBt2khiS35uG5IkGIJrLtAd1niWUFAbcsx_pBEgU',
                
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
                    26: { name: "حمٓ", content: "Al-Ahqaf:1 - akhir Ath Thur", pages: "502-520"},
                    27: { name: "وَٱلذَّٰرِيَـٰتِ ذَرْوًۭا", content: "Adz-Dzariyat:1 - Al-Hadid:29", pages: "520-541"},
                    28: { name: "قَدْ سَمِعَ ٱللَّهُ", content: "Al-Mujadilah:1 - At-Tahrim:12", pages: "542-561"},
                    29: { name: "تَبَـٰرَكَ ٱلَّذِى", content: "Al-Mulk:1 - Al-Mursalat:50", pages: "562-581"},
                    30: { name: "عَمَّ يَتَسَآءَلُونَ", content: "An-Naba:1 - An-Nas:6", pages: "582-604"}
                },

                // State management
                activeTab: 'checklist',
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
                    this.loadingMessage = 'Memulai aplikasi...';
                    
                    try {
                        // Test Supabase connection with better timeout
                        this.loadingMessage = 'Bismillaah...';
                        await this.testSupabaseConnectionInit();
                        
                        if (this.supabaseConnected) {
                            // Load data from Supabase
                            this.loadingMessage = 'Memuat data...';
                            await this.loadDataFromSupabase();
                            this.connectionStatus = 'online';
                            console.log('✅ Supabase mode activated');
                        } else {
                            // Fallback to localStorage
                            this.loadingMessage = 'Mode offline - memuat data lokal...';
                            this.connectionStatus = 'offline';
                            this.loadDataFromLocal();
                            console.log('📱 Offline mode activated');
                        }
                        
                    } catch (error) {
                        console.log('🟠 Falling back to offline mode:', error.message);
                        this.connectionStatus = 'offline';
                        this.supabaseConnected = false;
                        this.loadDataFromLocal();
                    }
                    
                    // Check announcement
                    this.loadingMessage = 'Menyiapkan pengumuman...';
                    this.checkAnnouncementStatus();
                    
                    // Setup months
                    this.loadingMessage = 'Menyiapkan data bulanan...';
                    this.generateAvailableMonths();
                    this.selectedMonth = this.getCurrentMonth();
                    
                    // Initialize monthly data structure
                    this.loadingMessage = 'Menginisialisasi struktur data bulanan...';
                    this.initializeMonthlyData();
                    
                    // Final setup
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
                        // Wait for Supabase to be available
                        let attempts = 0;
                        while (!window.supabaseClient && attempts < 20) {
                            await this.delay(100);
                            attempts++;
                        }
                        
                        if (!window.supabaseClient) {
                            throw new Error('Supabase client not initialized');
                        }
                        
                        console.log('🧪 Testing Supabase connection...');
                        
                        // Test with shorter timeout
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
                        
                        // Test basic connection
                        const testPromise = window.supabaseClient
                            .from('participants')
                            .select('count')
                            .limit(1);
                        
                        const { data, error } = await Promise.race([testPromise, timeoutPromise]);
                        
                        if (error) {
                            throw new Error(`Database error: ${error.message}`);
                        }
                        
                        // Test write permission
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

                // 🔧 FIXED: Load ALL historical data from Supabase
                async loadDataFromSupabase() {
                    try {
                        console.log('📥 Loading data from Supabase...');
                        
                        // Load participants
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

                        // 🆕 Load ALL daily checks (tidak hanya hari ini)
                        const { data: allChecks, error: allChecksError } = await window.supabaseClient
                            .from('daily_checks')
                            .select('participant_id, check_date')
                            .order('check_date', { ascending: false })
                            .limit(2000); // Ambil 2000 record terakhir
                            
                        if (allChecksError) {
                            console.warn('All checks load warning:', allChecksError);
                        } else if (allChecks) {
                            // Reset struktur data
                            this.todayChecks = {};
                            this.monthlyData = {};
                            
                            console.log('🔄 Reconstructing data from', allChecks.length, 'records...');
                            
                            // Rekonstruksi data dari semua centang
                            allChecks.forEach(check => {
                                const checkDate = check.check_date;
                                const participantId = check.participant_id;
                                const monthKey = checkDate.slice(0, 7); // "2025-07"
                                
                                // Tambahkan ke todayChecks
                                if (!this.todayChecks[checkDate]) {
                                    this.todayChecks[checkDate] = [];
                                }
                                if (!this.todayChecks[checkDate].includes(participantId)) {
                                    this.todayChecks[checkDate].push(participantId);
                                }
                                
                                // Tambahkan ke monthlyData
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

                        // Load khatam days dari monthly_records
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
                        
                        // Load today's checks
                        const todayChecks = localStorage.getItem('quranTrackerTodayChecks');
                        if (todayChecks) {
                            this.todayChecks = JSON.parse(todayChecks);
                        }
                        
                        // Load monthly data
                        const monthlyData = localStorage.getItem('quranTrackerMonthlyData');
                        if (monthlyData) {
                            this.monthlyData = JSON.parse(monthlyData);
                        }
                        
                        // Load participants
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
                    
                    // Initialize current month if not exists
                    if (!this.monthlyData[currentMonth]) {
                        this.monthlyData[currentMonth] = {
                            participantChecks: {},
                            khatamDays: []
                        };
                        
                        // Initialize all participants for current month
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
                        
                        // Save to Supabase if connected
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

                // 🆕 Quick edit participant (untuk admin)
                quickEditParticipant(participant) {
                    this.editParticipant(participant);
                },

                // 🆕 Update participant name inline
                async updateParticipantName(participantId, newName) {
                    const trimmedName = newName.trim();
                    
                    if (!trimmedName) {
                        alert('❌ Nama peserta tidak boleh kosong!');
                        // Reload to reset the input
                        location.reload();
                        return;
                    }
                    
                    const index = this.participants.findIndex(p => p.id === participantId);
                    if (index !== -1) {
                        const oldName = this.participants[index].name;
                        
                        // Only update if name actually changed
                        if (oldName === trimmedName) {
                            return;
                        }
                        
                        this.participants[index].name = trimmedName;
                        
                        // Show loading
                        this.isLoading = true;
                        this.loadingMessage = 'Menyimpan perubahan...';
                        
                        try {
                            // Save to Supabase if connected
                            if (this.supabaseConnected) {
                                const { error } = await window.supabaseClient
                                    .from('participants')
                                    .update({ name: trimmedName })
                                    .eq('id', participantId);
                                    
                                if (error) throw error;
                                console.log('✅ Participant name updated in Supabase');
                            }
                            
                            // Save to localStorage
                            this.saveData();
                            
                            alert(`✅ Nama berhasil diubah!\n\nDari: ${oldName}\nJadi: ${trimmedName}`);
                            
                        } catch (error) {
                            console.error('Error updating participant:', error);
                            alert('⚠️ Gagal menyimpan ke server, tersimpan di local saja');
                            this.saveData(); // Still save to localStorage
                        }
                        
                        this.isLoading = false;
                    }
                },

                // 🔧 FIXED: Better timezone handling
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

                getDaysInMonth(monthString = null) {
                    const targetMonth = monthString || this.selectedMonth;
                    if (!targetMonth) return 31;
                    const [year, month] = targetMonth.split('-');
                    return new Date(year, month, 0).getDate();
                },

                getDaysSinceStart() {
                    const jakartaToday = new Date(new Intl.DateTimeFormat('sv-SE', {
                        timeZone: 'Asia/Jakarta',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(new Date()));
                    
                    const programStart = new Date('2025-07-01');
                    const diffTime = jakartaToday - programStart;
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
                    const today = this.getTodayKey();
                    return this.todayChecks[today]?.includes(participantId) || false;
                },

                // 🔧 FIXED: Better toggle check with guaranteed monthly data persistence
                async toggleCheck(participantId) {
                    const today = this.getTodayKey();
                    const currentMonth = this.getCurrentMonth();
                    
                    // Debug log
                    console.log('🔄 Toggle check:', { participantId, today, currentMonth });
                    
                    // Ensure struktur data exist
                    if (!this.todayChecks[today]) {
                        this.todayChecks[today] = [];
                    }
                    
                    if (!this.monthlyData[currentMonth]) {
                        this.monthlyData[currentMonth] = {
                            participantChecks: {},
                            khatamDays: []
                        };
                    }
                    
                    if (!this.monthlyData[currentMonth].participantChecks[participantId]) {
                        this.monthlyData[currentMonth].participantChecks[participantId] = [];
                    }
                    
                    const index = this.todayChecks[today].indexOf(participantId);
                    const isCurrentlyChecked = index > -1;
                    
                    // Update today's checks
                    if (isCurrentlyChecked) {
                        this.todayChecks[today].splice(index, 1);
                    } else {
                        this.todayChecks[today].push(participantId);
                    }
                    
                    // 🆕 WAJIB: Update monthly data
                    const monthlyChecks = this.monthlyData[currentMonth].participantChecks[participantId];
                    const monthlyIndex = monthlyChecks.indexOf(today);
                    
                    if (isCurrentlyChecked) {
                        // Remove from monthly
                        if (monthlyIndex > -1) {
                            monthlyChecks.splice(monthlyIndex, 1);
                        }
                    } else {
                        // Add to monthly (avoid duplicates)
                        if (monthlyIndex === -1) {
                            monthlyChecks.push(today);
                            monthlyChecks.sort(); // Keep sorted
                        }
                    }
                    
                    // Update khatam status
                    this.updateKhatamStatus(today, currentMonth);
                    
                    // 🆕 LANGSUNG SAVE ke localStorage (backup)
                    this.saveData();
                    
                    // Save to Supabase
                    if (this.supabaseConnected) {
                        try {
                            if (isCurrentlyChecked) {
                                // Remove from Supabase
                                const { error: deleteError } = await window.supabaseClient
                                    .from('daily_checks')
                                    .delete()
                                    .eq('participant_id', participantId)
                                    .eq('check_date', today);
                                    
                                if (deleteError) throw deleteError;
                                console.log('✅ Check removed from Supabase');
                            } else {
                                // Add to Supabase
                                const { error: insertError } = await window.supabaseClient
                                    .from('daily_checks')
                                    .insert({
                                        participant_id: participantId,
                                        check_date: today
                                    });
                                    
                                if (insertError) throw insertError;
                                console.log('✅ Check added to Supabase');
                            }
                        } catch (error) {
                            console.error('❌ Supabase sync failed:', error);
                            // Jangan revert, karena sudah disave ke localStorage
                            alert('⚠️ Sinkronisasi Supabase gagal, tapi data tersimpan di lokal.');
                        }
                    }
                    
                    console.log('✅ Toggle complete. Monthly data:', this.monthlyData[currentMonth].participantChecks[participantId]);
                },

                updateKhatamStatus(date, month) {
                    const completedCount = this.todayChecks[date]?.length || 0;
                    const khatamDays = this.monthlyData[month].khatamDays;
                    const isKhatamDay = khatamDays.includes(date);
                    
                    if (completedCount === 30 && !isKhatamDay) {
                        // Add khatam day
                        khatamDays.push(date);
                        
                        // Save to Supabase if connected
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
                        // Remove khatam day
                        const index = khatamDays.indexOf(date);
                        if (index > -1) {
                            khatamDays.splice(index, 1);
                        }
                        
                        // Remove from Supabase if connected
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
                    const today = this.getTodayKey();
                    return this.todayChecks[today]?.length || 0;
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
                    // This function is called when user changes the selected month
                    // It ensures the monthly data structure exists for the selected month
                    if (!this.monthlyData[this.selectedMonth]) {
                        this.monthlyData[this.selectedMonth] = {
                            participantChecks: {},
                            khatamDays: []
                        };
                        
                        // Initialize all participants for this month
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

                async saveData() {
                    // Always save to localStorage as backup
                    try {
                        localStorage.setItem('quranTrackerTodayChecks', JSON.stringify(this.todayChecks));
                        localStorage.setItem('quranTrackerMonthlyData', JSON.stringify(this.monthlyData));
                        localStorage.setItem('quranTrackerParticipants', JSON.stringify(this.participants));
                        console.log('✅ Data saved to localStorage');
                    } catch (error) {
                        console.error('Error saving to localStorage:', error);
                    }
                },

                // 🆕 DEBUG: Debug function untuk cek data
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
                    
                    // Check specific participants
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

                // 🆕 FORCE SYNC: Force sync all data to Supabase
                async forceSyncAllData() {
                    if (!this.supabaseConnected) {
                        alert('❌ Supabase tidak terhubung');
                        return;
                    }
                    
                    this.isLoading = true;
                    this.loadingMessage = 'Force syncing all data...';
                    
                    try {
                        // Sync semua todayChecks ke daily_checks
                        let syncCount = 0;
                        for (const [date, participantIds] of Object.entries(this.todayChecks)) {
                            for (const participantId of participantIds) {
                                await window.supabaseClient
                                    .from('daily_checks')
                                    .upsert({
                                        participant_id: participantId,
                                        check_date: date
                                    });
                                syncCount++;
                            }
                        }
                        
                        // Sync semua khatam days
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

                // Admin functions
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
                    const jakartaTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' });
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
                    
                    rotatedParticipants.forEach((participant, index) => {
                        const juzNumber = index + 1;
                        const juzDetail = this.getJuzDetails(juzNumber);
                        const isCompleted = this.isCompleted(participant.id);
                        
                        const participantInfo = {
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
                    
                    let exportText = `*BISMILLAH ISTIQOMAH ONE DAY ONE JUZ*\n`;
                    exportText += `${dateStr}\n`;
                    exportText += `Update: ${timeStr} WIB\n`;
               //     exportText += `Sync: ${this.supabaseConnected ? 'Database terhubung' : 'Tidak terhubung'}\n`;
                    exportText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                    
               //     exportText += `*RINGKASAN PROGRESS*\n`;
               //     exportText += `Selesai: ${completedParticipants.length}/30\n`;
               //     exportText += `Belum Selesai: ${pendingParticipants.length}/30\n`;
                    
                    if (completedParticipants.length === 30) {
                        exportText += `*ALHAMDULILLAH KHATAM HARI INI!* \n`;
                    }
                    
                    exportText += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                    
                    if (completedParticipants.length > 0) {
                        exportText += `*SUDAH SELESAI (${completedParticipants.length})*\n`;
                        completedParticipants.forEach(p => {
                            exportText += ` ${p.name} - Juz ${p.juz} \n`;
                        });
                        exportText += `\n`;
                    }
                    
                    if (pendingParticipants.length > 0) {
                        exportText += `*BELUM SELESAI (${pendingParticipants.length})*\n`;
                        pendingParticipants.forEach(p => {
                            exportText += ` ${p.name} - Juz ${p.juz} \n`;
                        });
                    }
                    
                    exportText += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                    exportText += `💝 Semoga Allah mudahkan kita semua dalam membaca Al-Qur'an\n`;
                    exportText += `🤲 Barakallahu fiikum\n\n`;
             //       exportText += `#OneDayOneJuz #AlQuranTracker #Khatam`;
                    
                    this.exportText = exportText;
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
                        // Reset all data
                        this.todayChecks = {};
                        this.monthlyData = {};
                        this.exportText = '';
                        this.debugResult = '';

                        // Reset participants to default
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

                        // Clear localStorage
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
    
