var s = "avconv version 0.8.9-6:0.8.9-0ubuntu0.13.04.1, Copyright (c) 2000-2013 the Libav developers                                     \
  built on Nov  9 2013 19:09:48 with gcc 4.7.3                                                                                  \
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'v1.mp4':                                                                               \
  Metadata:                                                                                                                     \
    major_brand     : isom                                                                                                      \
    minor_version   : 512                                                                                                       \
    compatible_brands: isomiso2avc1mp41                                                                                         \
    encoder         : Lavf53.21.1                                                                                               \
  Duration: 00:00:01.02, start: 0.000000, bitrate: 1178 kb/s                                                                    \
    Stream #0.0(und): Video: h264 (Main), yuv420p, 768x432 [PAR 1:1 DAR 16:9], 985 kb/s, 25 fps, 25 tbr, 25 tbn, 50 tbc         \
    Stream #0.1(und): Audio: aac, 48000 Hz, stereo, s16, 200 kb/s ";

var r = /Duration:\s[0-9:.]*/;

console.log(r.exec(s)[0]);
