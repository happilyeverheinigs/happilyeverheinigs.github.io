function searchSong(){
    const spotifyApi = new SpotifyWebApi();
    
    //https://accounts.spotify.com/en/authorize?response_type=token&redirect_uri=https:%2F%2Fdeveloper.spotify.com%2Fcallback&client_id=774b29d4f13844c495f206cafdad9c86&scope=playlist-modify-private&state=qrdcro
    spotifyApi.setAccessToken('BQCCwudsf9ZxvPokuqq7PdhnJS2HegHx2sh0pooMktdfM4pPWn9bWtXil52Jkd0Lweb7jhdxAGjTklZPSERkQfa9qmJK4OBA5Pt_5rGHUrU_ZXOnOjXgpyHngM9_y790hv6kll0qWFCfuAq_dQKV1JNk1W3tcFecyLXRrUwRZN8');
    
    class nSong {
        constructor(track) {
            if (track != null) {
                this.name = track['name'];
                this.id = track['id'];
                this.artists = '';
                for (var i = 0; i < track['artists'].length; i++) {
                    var artist = track['artists'][i];
                    if (i != 0) {
                        this.artists += ', '
                    }
                    this.artists += artist['name'];
                }
                this.art = track['album']['images'][1]['url']
                this.audio = track['preview_url']
                this.uri = track['uri']
            } else {
                this.name = 'ERROR'
                this.id = 'ERROR'
                this.artists = 'ERROR'
            }
            console.log(`Created ${this.name} - ${this.artists} (${this.id})`)
        }
    }
    
    var query = document.getElementsByName("searchinput")[0].value
    console.log(query)
    
    var songs = []
    
    spotifyApi.search(query, ['track'], {
        market: "from_token"
    }, (err, result) => {
        if (err == null) {
            for (var i = 0; i < result['tracks']['items'].length; i++) {
                var track = result['tracks']['items'][i];
                songs.push(new nSong(track));
            }
    
            spotifyApi.addTracksToPlaylist('6CHAy1dBIcg4g0b0uTM23O', songs[0]['uri'])
        } else {
            //  TODO: HANDLE ERROR
        }
    })
    }