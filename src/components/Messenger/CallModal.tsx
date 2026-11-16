import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { User } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface CallModalProps {
  participant: User;
  callType: 'audio' | 'video';
  onEndCall: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({
  participant,
  callType,
  onEndCall
}) => {
  const [callState, setCallState] = useState<'ringing' | 'connected'>('ringing');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Play realistic ringtone when ringing
  useEffect(() => {
    sounds.startRingtone();

    // Auto connect after 3 seconds for realistic demo response
    const connectTimer = setTimeout(() => {
      sounds.stopRingtone();
      setCallState('connected');
    }, 3200);

    return () => {
      clearTimeout(connectTimer);
      sounds.stopRingtone();
    };
  }, []);

  // Call duration counter
  useEffect(() => {
    if (callState !== 'connected') return;
    const interval = setInterval(() => {
      setCallDuration(d => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  // Request actual camera stream if video call
  useEffect(() => {
    if (callType === 'video' && !isVideoDisabled) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            streamRef.current = stream;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(() => {
            // fallback gracefully without crash
          });
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [callType, isVideoDisabled]);

  const handleEnd = () => {
    sounds.playCallEnd();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    onEndCall();
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl h-[85vh] max-h-[700px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col justify-between">
        
        {/* VIDEO CALL REMOTE BACKGROUND */}
        {callType === 'video' && !isVideoDisabled ? (
          <div className="absolute inset-0 z-0">
            {/* Remote simulated video representation */}
            <img
              src={participant.avatar}
              alt={participant.name}
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 via-rose-950/30 to-zinc-900 flex items-center justify-center">
            {/* Audio call waveform animation */}
            <div className="flex items-center gap-1.5 opacity-60">
              {[40, 70, 110, 50, 90, 120, 60, 100, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-rose-500 rounded-full animate-pulse"
                  style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* SELF PREVIEW WINDOW (Picture-in-Picture) */}
        {callType === 'video' && !isVideoDisabled && (
          <div className="absolute top-4 right-4 z-20 w-28 sm:w-36 h-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl bg-zinc-800">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1.5 left-2 text-[10px] text-white/80 font-semibold drop-shadow-sm">
              আপনি (Self)
            </span>
          </div>
        )}

        {/* TOP CALL HEADER */}
        <div className="relative z-10 p-5 text-center text-white">
          <div className="inline-block p-1 rounded-full bg-rose-600/30 border border-rose-500/40 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-rose-300 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              মানবতার ফেরিওয়ালা ফ্রি কলিং
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold drop-shadow-md">
            {participant.banglaName || participant.name}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {callState === 'ringing' ? (
              <span className="animate-pulse">কল হচ্ছে (Ringing)...</span>
            ) : (
              <span className="text-emerald-400 font-bold">{formatDuration(callDuration)}</span>
            )}
          </p>
        </div>

        {/* CENTER AVATAR IN AUDIO MODE */}
        {callType === 'audio' && (
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-rose-500 shadow-2xl"
              />
              {callState === 'ringing' && (
                <div className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping opacity-75" />
              )}
            </div>
            <span className="text-xs text-slate-400 mt-3">
              হটলাইন: 01825986764 · এনক্রিপ্টেড সংযোগ
            </span>
          </div>
        )}

        {/* BOTTOM CONTROLS DOCK */}
        <div className="relative z-10 p-6 flex items-center justify-center gap-4 sm:gap-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          
          {/* Mute Mic */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-red-500/80 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video */}
          {callType === 'video' && (
            <button
              onClick={() => setIsVideoDisabled(!isVideoDisabled)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isVideoDisabled ? 'bg-red-500/80 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {isVideoDisabled ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          {/* Speaker Mute */}
          <button
            onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isSpeakerMuted ? 'bg-red-500/80 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEnd}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/40 active:scale-95 transition-all"
          >
            <PhoneOff className="w-7 h-7" />
          </button>

        </div>

      </div>
    </div>
  );
};
