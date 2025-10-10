
        // Supabase Configuration
        const SUPABASE_URL = 'https://avbfccjifnptszchabjh.supabase.co'
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YmZjY2ppZm5wdHN6Y2hhYmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTQyODMsImV4cCI6MjA2NzI3MDI4M30.Al8QBt2khiS35uG5IkGIJrLtAd1niWUFAbcsx_pBEgU'
        
        // Initialize Supabase with better error handling
        let supabase = null;
        
        function initializeSupabase() {
            try {
                // Check if supabase library is loaded
                if (typeof window.supabase === 'undefined') {
                    console.log('🔴 Supabase library not loaded');
                    return false;
                }
                
                // Create supabase client
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                    auth: {
                        persistSession: false
                    },
                    db: {
                        schema: 'public'
                    },
                    global: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                });
                
                window.supabaseClient = supabase;
                console.log('🟢 Supabase client created successfully');
                console.log('🔗 URL:', SUPABASE_URL);
                console.log('🔑 Key length:', SUPABASE_ANON_KEY.length);
                return true;
                
            } catch (error) {
                console.log('🔴 Supabase initialization failed:', error);
                return false;
            }
        }
        
        // Initialize after DOM loads
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const success = initializeSupabase();
                if (success) {
                    console.log('✅ Supabase ready for use');
                } else {
                    console.log('❌ Falling back to offline mode');
                }
            }, 100);
        });