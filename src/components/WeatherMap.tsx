import React, { useState, useEffect } from 'react';
import { Map, Layers, Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

export const WeatherMap: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('precipitation');
  const [currentFrame, setCurrentFrame] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const layers = [
    { id: 'precipitation', label: 'Precipitation', color: 'bg-blue-500' },
    { id: 'temperature', label: 'Temperature', color: 'bg-red-500' },
    { id: 'wind', label: 'Wind', color: 'bg-green-500' },
    { id: 'clouds', label: 'Clouds', color: 'bg-gray-500' },
    { id: 'pressure', label: 'Pressure', color: 'bg-purple-500' },
  ];

  const totalFrames = 12;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const getLayerOpacity = (frameIndex: number) => {
    const distance = Math.abs(frameIndex - currentFrame);
    const maxDistance = Math.floor(totalFrames / 2);
    return Math.max(0.1, 1 - (distance / maxDistance) * 0.8);
  };

  const generateRadarData = () => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * 360;
      const intensity = Math.random() * 0.8 + 0.2;
      const size = Math.random() * 30 + 10;
      data.push({ angle, intensity, size });
    }
    return data;
  };

  const radarData = generateRadarData();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weather Radar
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
            title={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title="Reset to current time"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Layer Selection */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Layers className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <div className="flex flex-wrap gap-2">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedLayer === layer.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${layer.color} ${
                selectedLayer === layer.id ? 'bg-white' : ''
              }`}></div>
              <span>{layer.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Frame: {currentFrame + 1} of {totalFrames}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(Date.now() - (totalFrames - currentFrame - 1) * 10 * 60 * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentFrame + 1) / totalFrames) * 100}%` }}
        ></div>
      </div>

      {/* Radar Display */}
      <div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-xl relative overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </radialGradient>
          </defs>

          <rect width="400" height="300" fill="url(#grid)" />

          {/* Radar circles */}
          {[50, 100, 150].map((radius, index) => (
            <circle
              key={index}
              cx="200"
              cy="150"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Radar sweep */}
          <g>
            <line
              x1="200"
              y1="150"
              x2={200 + Math.cos((currentFrame * 30 - 90) * Math.PI / 180) * 150}
              y2={150 + Math.sin((currentFrame * 30 - 90) * Math.PI / 180) * 150}
              stroke="rgba(34, 197, 94, 0.8)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle
              cx="200"
              cy="150"
              r="4"
              fill="rgba(34, 197, 94, 1)"
              className="animate-pulse"
            />
          </g>

          {/* Weather data points */}
          {radarData.map((point, index) => {
            const frameOpacity = getLayerOpacity(index);
            const x = 200 + Math.cos(point.angle * Math.PI / 180) * (point.size + 50);
            const y = 150 + Math.sin(point.angle * Math.PI / 180) * (point.size + 50);

            return (
              <g key={index} opacity={frameOpacity}>
                {selectedLayer === 'precipitation' && (
                  <circle
                    cx={x}
                    cy={y}
                    r={point.size * point.intensity}
                    fill="rgba(59, 130, 246, 0.6)"
                    className="animate-pulse"
                  />
                )}
                {selectedLayer === 'temperature' && (
                  <circle
                    cx={x}
                    cy={y}
                    r={point.size * point.intensity}
                    fill="rgba(239, 68, 68, 0.6)"
                    className="animate-pulse"
                  />
                )}
                {selectedLayer === 'wind' && (
                  <g>
                    <line
                      x1={x - point.size * 0.5}
                      y1={y}
                      x2={x + point.size * 0.5}
                      y2={y}
                      stroke="rgba(34, 197, 94, 0.8)"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                )}
                {selectedLayer === 'clouds' && (
                  <circle
                    cx={x}
                    cy={y}
                    r={point.size * point.intensity}
                    fill="rgba(156, 163, 175, 0.6)"
                    className="animate-pulse"
                  />
                )}
                {selectedLayer === 'pressure' && (
                  <circle
                    cx={x}
                    cy={y}
                    r={point.size * point.intensity}
                    fill="rgba(147, 51, 234, 0.6)"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}

          {/* Arrow marker for wind */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7"
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(34, 197, 94, 0.8)" />
            </marker>
          </defs>

          {/* Location marker */}
          <circle cx="200" cy="150" r="6" fill="rgba(239, 68, 68, 1)" stroke="white" strokeWidth="2" />
          <text x="200" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            San Francisco
          </text>
        </svg>

        {/* Radar overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-conic from-transparent via-blue-500/10 to-transparent"
            style={{
              transform: `rotate(${currentFrame * 30}deg)`,
              transformOrigin: 'center',
              transition: isPlaying ? 'none' : 'transform 0.3s ease-out'
            }}
          ></div>
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white text-xs font-medium">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Time indicator */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white text-xs font-medium">
            {isPlaying ? 'LIVE' : 'PAUSED'}
          </span>
        </div>
      </div>

      {/* Legend - moved below the radar display */}
      <div className="mt-4 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="text-white text-xs font-medium mb-2">Intensity</div>
        <div className="flex flex-wrap items-center justify-center space-x-2">
          {selectedLayer === 'precipitation' && (
            <>
              <div className="w-3 h-3 bg-blue-300 rounded"></div>
              <span className="text-white text-xs">Light</span>
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-white text-xs">Moderate</span>
              <div className="w-3 h-3 bg-blue-700 rounded"></div>
              <span className="text-white text-xs">Heavy</span>
            </>
          )}
          {selectedLayer === 'temperature' && (
            <>
              <div className="w-3 h-3 bg-blue-400 rounded"></div>
              <span className="text-white text-xs">Cold</span>
              <div className="w-3 h-3 bg-yellow-400 rounded"></div>
              <span className="text-white text-xs">Mild</span>
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-white text-xs">Hot</span>
            </>
          )}
          {selectedLayer === 'wind' && (
            <>
              <div className="w-3 h-3 bg-green-300 rounded"></div>
              <span className="text-white text-xs">Light</span>
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-white text-xs">Strong</span>
            </>
          )}
          {selectedLayer === 'clouds' && (
            <>
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span className="text-white text-xs">Thin</span>
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span className="text-white text-xs">Thick</span>
            </>
          )}
          {selectedLayer === 'pressure' && (
            <>
              <div className="w-3 h-3 bg-purple-300 rounded"></div>
              <span className="text-white text-xs">Low</span>
              <div className="w-3 h-3 bg-purple-600 rounded"></div>
              <span className="text-white text-xs">High</span>
            </>
          )}
        </div>
      </div>

      {/* Radar Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Range:</span>
          <select className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-2 py-1 border-none focus:ring-2 focus:ring-blue-500">
            <option value="local">Local (50km)</option>
            <option value="regional">Regional (200km)</option>
            <option value="national">National (500km)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
          <select
            className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-2 py-1 border-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              // Speed control would adjust animation interval
              console.log('Speed changed to:', e.target.value);
            }}
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>

      {/* Radar Information */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Resolution:</span>
            <div className="font-medium text-gray-900 dark:text-white">1km</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Coverage:</span>
            <div className="font-medium text-gray-900 dark:text-white">Regional</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Source:</span>
            <div className="font-medium text-gray-900 dark:text-white">NOAA</div>
          </div>
        </div>
      </div>
    </div>
  );
};