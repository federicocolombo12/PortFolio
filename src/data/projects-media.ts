export interface MediaItem {
	type: 'video' | 'image';
	url: string;
	thumb: string;
	title?: string;
}

export interface ShowreelSlide {
	title: string;
	sub: string;
	tag: string;
	image: string;
	video: string;
	projectId: string;
	metric?: string;
}

export function getProjectBadge(p: any): string {
	const id = p.id;
	if (id === 'stylized-gaussian-splats') return 'Blender 5.3 / Geometry Nodes';
	if (id === 'graphics-lab') return 'C++ / OpenGL';
	if (id === 'thesis-medical-xr') return 'Unity 6 / HLSL';
	if (id === 'webgpu-2d-gi') return 'WebGPU / WGSL Compute';
	if (id === 'ue5-procedural-environment') return 'Unreal Engine 5';
	if (id === 'ue5-niagara-vfx') return 'UE5 Niagara';
	if (id === 'ue5-metahuman-cinematics') return 'UE5 MetaHuman';
	if (id === 'ue5-reality-capture') return '3DGS / Photogrammetry';
	if (id === 'smart-cable-generator') return 'Blender / Python';
	if (id === 'line-operator') return 'Blender 3D / Unity C#';
	if (id === 'spicy-mercante') return 'Unity C#';
	if (id === 'harmony') return 'Unity 6 / VR';
	if (id === 'awaken-asylum') return 'Unity VR';
	if (id === 'nihil') return 'Unity 2D';
	if (id === 'blender-renders') return 'Blender 3D';
	if (id === 'froglet') return 'Blender Rigging';
	if (id === 'corto-in-3d') return 'Blender Animation';
	if (id === 'ziva') return 'VR 360° Film';
	if (id === 'chiavi-ombra') return 'VR 360° Film';
	if (id === 'visual-effects') return 'VFX / Tracking';
	if (id === 'easycooking') return 'DaVinci / Editing';
	if (id === 'video-shooting-and-editing') return 'Cinematography';
	if (id === 'phygital-smart-locker') return 'ESP32 / IoT';
	if (id === 'mathify') return 'React Native / UXD';
	if (id === 'elo-ping-pong') return 'React Native / PWA';
	return p.data?.category || 'Graphics';
}

export function getProjectMediaMap(baseUrl: string): Record<string, MediaItem[]> {
	return {
		'stylized-gaussian-splats': [
			{ type: 'video', url: `${baseUrl}/videos/stylized-gaussian/demonstration.mp4`, thumb: `${baseUrl}/videos/stylized-gaussian/demonstration_poster.jpg`, title: 'Stylized 3DGS Viewport Demo (60 FPS)' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/01_pixar_watercolor_final.png`, thumb: `${baseUrl}/projects/stylized-gaussian/01_pixar_watercolor_final.png`, title: 'Watercolor Master Render' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/02_pixar_heavy_impasto.png`, thumb: `${baseUrl}/projects/stylized-gaussian/02_pixar_heavy_impasto.png`, title: 'Heavy Impasto Stroke Detail' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/03_brush_tangent_flow_field.png`, thumb: `${baseUrl}/projects/stylized-gaussian/03_brush_tangent_flow_field.png`, title: 'Soft Watercolor & Anisotropic Flow' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/04_delighting_rd_experiment.png`, thumb: `${baseUrl}/projects/stylized-gaussian/04_delighting_rd_experiment.png`, title: 'Delighting R&D Luminance Pass' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/05_pixar_raw_capture_reference.png`, thumb: `${baseUrl}/projects/stylized-gaussian/05_pixar_raw_capture_reference.png`, title: 'Raw 3DGS Capture Reference' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/pipeline_architecture_diagram.svg`, thumb: `${baseUrl}/projects/stylized-gaussian/pipeline_architecture_diagram.svg`, title: 'Pipeline Architecture Schematic' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/geonodes_flow_graph.jpg`, thumb: `${baseUrl}/projects/stylized-gaussian/geonodes_flow_graph.jpg`, title: 'Geometry Nodes Deformation Graph' },
			{ type: 'image', url: `${baseUrl}/projects/stylized-gaussian/blender_ui_panel.jpg`, thumb: `${baseUrl}/projects/stylized-gaussian/blender_ui_panel.jpg`, title: 'Blender N-Panel Extension UI' },
		],
		'thesis-medical-xr': [
			{ type: 'video', url: `${baseUrl}/videos/pulse-engine/bouba_kiki_morph.mp4`, thumb: `${baseUrl}/videos/pulse-engine/bouba_kiki_morph_poster.jpg`, title: 'Bouba/Kiki SDF Morphing (Quest 3 90FPS)' },
			{ type: 'video', url: `${baseUrl}/videos/pulse-engine/csg_modeling_demo.mp4`, thumb: `${baseUrl}/videos/pulse-engine/csg_modeling_demo_poster.jpg`, title: 'Real-Time CSG Boolean Modeling' },
			{ type: 'video', url: `${baseUrl}/videos/pulse-engine/vfx_swarm_adhesion.mp4`, thumb: `${baseUrl}/videos/pulse-engine/vfx_swarm_adhesion_poster.jpg`, title: 'GPU Voxelizer Particle Swarm' },
			{ type: 'video', url: `${baseUrl}/videos/pulse-engine/profiling_hud_recording.mp4`, thumb: `${baseUrl}/videos/pulse-engine/profiling_hud_recording_poster.jpg`, title: 'Snapdragon XR2 Profiling HUD' },
			{ type: 'image', url: `${baseUrl}/projects/pulse-engine/daw_mixer_full.png`, thumb: `${baseUrl}/projects/pulse-engine/daw_mixer_full.png`, title: 'Virtual DAW Biometric Mixer' },
			{ type: 'image', url: `${baseUrl}/projects/pulse-engine/biosignal_sdf_material_inspector.png`, thumb: `${baseUrl}/projects/pulse-engine/biosignal_sdf_material_inspector.png`, title: 'Shader Material Inspector' },
		],
		'graphics-lab': [
			{ type: 'video', url: `${baseUrl}/videos/graphics-lab/PBR_Screen.mp4`, thumb: `${baseUrl}/videos/graphics-lab/PBR_Screen_poster.jpg`, title: 'Cook-Torrance PBR Engine' },
			{ type: 'video', url: `${baseUrl}/videos/graphics-lab/02_Deferred.mp4`, thumb: `${baseUrl}/videos/graphics-lab/02_Deferred_poster.jpg`, title: 'Deferred Shading G-Buffer Pipeline' },
			{ type: 'video', url: `${baseUrl}/videos/graphics-lab/SPOM.mp4`, thumb: `${baseUrl}/videos/graphics-lab/SPOM_poster.jpg`, title: 'Silhouette Parallax Occlusion Mapping' },
			{ type: 'video', url: `${baseUrl}/videos/graphics-lab/01_RayMarcher.mp4`, thumb: `${baseUrl}/videos/graphics-lab/01_RayMarcher_poster.jpg`, title: 'SDF Raymarching Sandbox' },
		],
		'webgpu-2d-gi': [
			{ type: 'video', url: `${baseUrl}/videos/webgpu-2d-gi/demo.mp4`, thumb: `${baseUrl}/videos/webgpu-2d-gi/demo_poster.jpg`, title: 'Real-Time 2D GI Compute Pipeline (512×512 @ 144 FPS)' },
			{ type: 'image', url: `${baseUrl}/projects/webgpu-2d-gi/preview.jpg`, thumb: `${baseUrl}/projects/webgpu-2d-gi/preview.jpg`, title: '5-Stage Pass Inspector & AgX Composite' },
			{ type: 'image', url: `${baseUrl}/projects/webgpu-2d-gi/pipeline_architecture_diagram.svg`, thumb: `${baseUrl}/projects/webgpu-2d-gi/pipeline_architecture_diagram.svg`, title: '15-Dispatch WebGPU Compute Render Graph' },
		],
		'smart-cable-generator': [
			{ type: 'video', url: `${baseUrl}/projects/pipeline-tools/cable_demo_3.mp4`, thumb: `${baseUrl}/projects/pipeline-tools/cable_demo_3_poster.jpg`, title: 'Real-Time Catenary Cable Physics' },
			{ type: 'video', url: `${baseUrl}/projects/pipeline-tools/cable_demo_1.mp4`, thumb: `${baseUrl}/projects/pipeline-tools/cable_demo_1_poster.jpg`, title: 'Multi-Object Surface Snapping' },
			{ type: 'image', url: `${baseUrl}/projects/pipeline-tools/ui_screenshot.jpg`, thumb: `${baseUrl}/projects/pipeline-tools/ui_screenshot.jpg`, title: 'Blender Add-on Custom UI Panel' },
		],
		'ue5-procedural-environment': [
			{ type: 'video', url: `${baseUrl}/videos/tech-art/a1_pcg.mp4`, thumb: `${baseUrl}/videos/tech-art/a1_pcg_poster.jpg`, title: 'Procedural Content Generation (PCG)' },
			{ type: 'video', url: `${baseUrl}/videos/tech-art/env_a1.mp4`, thumb: `${baseUrl}/videos/tech-art/env_a1_poster.jpg`, title: 'Dynamic Weather & Lighting Pipeline' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_03.webp`, thumb: `${baseUrl}/figma-slides/slide_03.webp`, title: 'Slide 03 · Tool Breakdown & Architecture' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_04.webp`, thumb: `${baseUrl}/figma-slides/slide_04.webp`, title: 'Slide 04 · Auto-Materials Ecosystem' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_06.webp`, thumb: `${baseUrl}/figma-slides/slide_06.webp`, title: 'Slide 06 · Heightmap & Topography Flow' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_10.webp`, thumb: `${baseUrl}/figma-slides/slide_10.webp`, title: 'Slide 10 · PCG Spline Grass & Megaplants' },
		],
		'ue5-metahuman-cinematics': [
			{ type: 'video', url: `${baseUrl}/videos/tech-art/a2_hair.mp4`, thumb: `${baseUrl}/videos/tech-art/a2_hair_poster.jpg`, title: 'MetaHuman Grooming & Hair Simulation' },
			{ type: 'video', url: `${baseUrl}/videos/tech-art/a3_cartwheel.mp4`, thumb: `${baseUrl}/videos/tech-art/a3_cartwheel_poster.jpg`, title: 'Full-Body Motion Capture & Sequencer' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_18.webp`, thumb: `${baseUrl}/figma-slides/slide_18.webp`, title: 'Slide 18 · RealityScan to MetaHuman Pipeline' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_20.webp`, thumb: `${baseUrl}/figma-slides/slide_20.webp`, title: 'Slide 20 · MetaHumans A/B Comparison' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_24.webp`, thumb: `${baseUrl}/figma-slides/slide_24.webp`, title: 'Slide 24 · Hair Grooming Blender to UE5' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_31.webp`, thumb: `${baseUrl}/figma-slides/slide_31.webp`, title: 'Slide 31 · Sequencer Camera Shots' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_34.webp`, thumb: `${baseUrl}/figma-slides/slide_34.webp`, title: 'Slide 34 · Directing Shot Breakdown' },
		],
		'ue5-reality-capture': [
			{ type: 'video', url: `${baseUrl}/videos/tech-art/a4_house.mp4`, thumb: `${baseUrl}/videos/tech-art/a4_house_poster.jpg`, title: 'RealityCapture Photogrammetry Dataset' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_40.webp`, thumb: `${baseUrl}/figma-slides/slide_40.webp`, title: 'Slide 40 · Pipeline RealityCapture' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_42.webp`, thumb: `${baseUrl}/figma-slides/slide_42.webp`, title: 'Slide 42 · COLMAP Structure from Motion' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_46.webp`, thumb: `${baseUrl}/figma-slides/slide_46.webp`, title: 'Slide 46 · Dependency & DLL Analysis' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_51.webp`, thumb: `${baseUrl}/figma-slides/slide_51.webp`, title: 'Slide 51 · 3D Gaussian Splatting Training' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_55.webp`, thumb: `${baseUrl}/figma-slides/slide_55.webp`, title: 'Slide 55 · Cloud AI Tools Post-Mortem' },
		],
		'ue5-niagara-vfx': [
			{ type: 'video', url: `${baseUrl}/videos/tech-art/a5_render.mp4`, thumb: `${baseUrl}/videos/tech-art/a5_render_poster.jpg`, title: 'Niagara GPU Comet Particle System' },
			{ type: 'video', url: `${baseUrl}/videos/tech-art/a5_final.mp4`, thumb: `${baseUrl}/videos/tech-art/a5_final_poster.jpg`, title: 'Final Cinematics Composite' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_59.webp`, thumb: `${baseUrl}/figma-slides/slide_59.webp`, title: 'Slide 59 · Environment Lighting & VFX Setup' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_62.webp`, thumb: `${baseUrl}/figma-slides/slide_62.webp`, title: 'Slide 62 · Niagara System Anatomy' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_63.webp`, thumb: `${baseUrl}/figma-slides/slide_63.webp`, title: 'Slide 63 · Meteor System: 4 Emitters' },
			{ type: 'image', url: `${baseUrl}/figma-slides/slide_64.webp`, thumb: `${baseUrl}/figma-slides/slide_64.webp`, title: 'Slide 64 · Homing Logic & Dynamic Lighting' },
		],
		'blender-renders': [
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/SIMULATORI%20FRONT%20VIEW/SIMULATORI_FRONT_VIEW.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/SIMULATORI_FRONT_VIEW/SIMULATORI_FRONT_VIEW.jpg`, title: 'Simulator Front View' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Panoramica%20arcade/Panoramica_arcade.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Panoramica%20arcade/Panoramica_arcade.jpg`, title: 'Arcade Panoramic View' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Close%20Up%20pokeball/Close_Up_pokeball.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Close%20Up%20pokeball/Close_Up_pokeball.jpg`, title: 'Pokeball Close-Up Detail' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Fisheye%20Arcade/Fisheye_Arcade.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Fisheye%20Arcade/Fisheye_Arcade.jpg`, title: 'Fisheye Arcade View' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Close_Up_Arcade_2/Close_Up_Arcade_2.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Close_Up_Arcade_2/Close_Up_Arcade_2.jpg`, title: 'Arcade Cabinet Close-Up' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Led%20View/Led_View.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Led%20View/Led_View.jpg`, title: 'Neon LED Atmosphere' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Bar-View/Bar-View.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Bar-View/Bar-View.jpg`, title: 'Bar Lounge Environment' },
			{ type: 'image', url: `${baseUrl}/projects/Blender_Renders/Untitled/Simulatore/Simulatore.jpg`, thumb: `${baseUrl}/projects/Blender_Renders/Untitled/Simulatore/Simulatore.jpg`, title: 'Racing Simulator Rig' },
		],
		'spicy-mercante': [
			{ type: 'video', url: `${baseUrl}/projects/spicy-mercante/video2.mp4`, thumb: `${baseUrl}/projects/spicy-mercante/image1.jpeg`, title: 'Procedural Water Shader & Buoyancy Physics' },
			{ type: 'image', url: `${baseUrl}/projects/spicy-mercante/image1.jpeg`, thumb: `${baseUrl}/projects/spicy-mercante/image1.jpeg`, title: '3D Merchant & Bazaar Props (Blender)' },
		],
		'visual-effects': [
			{ type: 'video', url: `${baseUrl}/projects/visual-effects/tech_art_video.mp4`, thumb: `${baseUrl}/projects/visual-effects/set_photo1.jpg`, title: 'VFX Breakdown & Tracking' },
			{ type: 'image', url: `${baseUrl}/projects/visual-effects/set_photo1.jpg`, thumb: `${baseUrl}/projects/visual-effects/set_photo1.jpg`, title: 'On-Set Camera Tracking Markers' },
			{ type: 'image', url: `${baseUrl}/projects/visual-effects/set_photo2.jpg`, thumb: `${baseUrl}/projects/visual-effects/set_photo2.jpg`, title: 'Camera Operation & Lens Setup' },
			{ type: 'image', url: `${baseUrl}/projects/visual-effects/set_photo3.jpg`, thumb: `${baseUrl}/projects/visual-effects/set_photo3.jpg`, title: 'Close-Up Matte & Plate Capture' },
			{ type: 'video', url: `${baseUrl}/projects/visual-effects/cloth_video.mp4`, thumb: `${baseUrl}/projects/visual-effects/cloth_photo1.jpg`, title: 'Digital Cloth Simulation' },
			{ type: 'image', url: `${baseUrl}/projects/visual-effects/cloth_photo1.jpg`, thumb: `${baseUrl}/projects/visual-effects/cloth_photo1.jpg`, title: 'Cloth Solver Wireframe & Mesh' },
			{ type: 'image', url: `${baseUrl}/projects/visual-effects/cloth_photo2.jpg`, thumb: `${baseUrl}/projects/visual-effects/cloth_photo2.jpg`, title: 'Cloth Material Shading' },
		],
		'froglet': [
			{ type: 'video', url: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/EspressioniFacciali.mp4`, thumb: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/First_Shot_Def0001-0055.mp40004.png`, title: 'Facial Rigging & Shape Keys' },
			{ type: 'video', url: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/DisplacementAndTexture.mp4`, thumb: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/ScreenNodi_Texture.png`, title: 'Procedural Texture & Displacement' },
			{ type: 'image', url: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/First_Shot_Def0001-0055.mp40004.png`, thumb: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/First_Shot_Def0001-0055.mp40004.png`, title: 'Froglet Final Frame Render' },
			{ type: 'image', url: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/ScreenNodi_Texture.png`, thumb: `${baseUrl}/projects/3D_Animation/Animation%20Stuff/Froglet/ScreenNodi_Texture.png`, title: 'Blender Shader Nodes' },
		],
		'phygital-smart-locker': [
			{ type: 'video', url: `${baseUrl}/projects/Phygital_Smart_Locker/IMG_5505.mp4`, thumb: `${baseUrl}/projects/Phygital_Smart_Locker/WhatsApp_Image_2026-03-05_at_15.23.23.jpeg`, title: 'Locking Actuator & Servo Test' },
			{ type: 'video', url: `${baseUrl}/projects/Phygital_Smart_Locker/IMG_5506.mp4`, thumb: `${baseUrl}/projects/Phygital_Smart_Locker/WhatsApp_Image_2026-03-05_at_15.23.23.jpeg`, title: 'RFID Sensor & Card Read' },
			{ type: 'image', url: `${baseUrl}/projects/Phygital_Smart_Locker/WhatsApp_Image_2026-03-05_at_15.23.23.jpeg`, thumb: `${baseUrl}/projects/Phygital_Smart_Locker/WhatsApp_Image_2026-03-05_at_15.23.23.jpeg`, title: 'Smart Locker Prototype Hardware' },
		],
		'elo-ping-pong': [
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/hero_showcase.png`, thumb: `${baseUrl}/projects/elo-ping-pong/hero_showcase.png`, title: 'EloPingPong Arena Mobile Showcase' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/architecture_diagram.svg`, thumb: `${baseUrl}/projects/elo-ping-pong/architecture_diagram.svg`, title: 'UX Gamification Loop & Real-Time Firebase Architecture' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/01_match_setup.png`, thumb: `${baseUrl}/projects/elo-ping-pong/01_match_setup.png`, title: 'Match Setup & Contextual Elo Modifiers' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/02_leaderboard_podium.png`, thumb: `${baseUrl}/projects/elo-ping-pong/02_leaderboard_podium.png`, title: 'Podium, Dual Elo/ATP Race & Wooden Spoon' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/03_live_referee.png`, thumb: `${baseUrl}/projects/elo-ping-pong/03_live_referee.png`, title: 'Full-Screen Table-Side Live Referee' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/04_live_betting.png`, thumb: `${baseUrl}/projects/elo-ping-pong/04_live_betting.png`, title: 'Multi-Market Live Betting & DP Odds' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/05_stats_coach_analytics.png`, thumb: `${baseUrl}/projects/elo-ping-pong/05_stats_coach_analytics.png`, title: 'AI Tactical Coach & Telemetry Stats' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/06_bazar_lucky_wheel.png`, thumb: `${baseUrl}/projects/elo-ping-pong/06_bazar_lucky_wheel.png`, title: 'Meritocratic Bazar & 24h Lucky Wheel' },
			{ type: 'image', url: `${baseUrl}/projects/elo-ping-pong/07_profile_wanted_bounty.png`, thumb: `${baseUrl}/projects/elo-ping-pong/07_profile_wanted_bounty.png`, title: 'Agent Profile & WANTED Bounties' },
		],
		'mathify': [
			{ type: 'image', url: `${baseUrl}/projects/mathify/hero_cover.png`, thumb: `${baseUrl}/projects/mathify/hero_cover.png`, title: 'Mathify Mobile App Showcase' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/architecture_diagram.svg`, thumb: `${baseUrl}/projects/mathify/architecture_diagram.svg`, title: 'UXD Process & React Native / Firebase Architecture' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/app_home_sfide.png`, thumb: `${baseUrl}/projects/mathify/app_home_sfide.png`, title: 'Home Challenges Explore Screen' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/app_play_quiz.png`, thumb: `${baseUrl}/projects/mathify/app_play_quiz.png`, title: 'Timed Quiz Arena & Power-Ups' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/app_summary_results.png`, thumb: `${baseUrl}/projects/mathify/app_summary_results.png`, title: 'Post-Challenge Accuracy Breakdown' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/app_report_modal.png`, thumb: `${baseUrl}/projects/mathify/app_report_modal.png`, title: 'Inline Error Reporting Modal' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/lowfi_flow_diagram.png`, thumb: `${baseUrl}/projects/mathify/lowfi_flow_diagram.png`, title: 'Complete Mobile Navigation Flowchart' },
			{ type: 'image', url: `${baseUrl}/projects/mathify/storyboard.jpg`, thumb: `${baseUrl}/projects/mathify/storyboard.jpg`, title: 'User Needfinding Comic Storyboard' },
		],
		'harmony': [
			{ type: 'video', url: `${baseUrl}/projects/Game_Development/Gamedev/Harmony/harmony_live_demo.mp4`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Harmony/harmony_live_demo_poster.jpg`, title: 'Real-Time Vocal Cymatics & Meta Quest Live Interaction' },
			{ type: 'image', url: `${baseUrl}/covers/Harmony.png`, thumb: `${baseUrl}/covers/Harmony.png`, title: 'Harmony VR Key Visual' },
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Harmony/harmony_logo.png`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Harmony/harmony_logo.png`, title: 'Harmony VR Logo' },
		],
		'awaken-asylum': [
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Awaken%20Asylum/Screenshot_2025-02-15_145331.png`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Awaken%20Asylum/Screenshot_2025-02-15_145331.png`, title: 'Asylum Interior Shading & Architecture' },
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Awaken%20Asylum/Screenshot_2025-02-15_144349.png`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Awaken%20Asylum/Screenshot_2025-02-15_144349.png`, title: 'Volumetric Fog & Atmospheric Lighting' },
		],
		'easycooking': [
			{ type: 'image', url: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/EasyCooking/EasyCooking%20Gallery/Untitled%2019b9-8e21/Screenshot_2024-06-22_alle_21.00.22.png`, thumb: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/EasyCooking/EasyCooking%20Gallery/Untitled%2019b9-8e21/Screenshot_2024-06-22_alle_21.00.22.png`, title: 'Production Set & Lighting' },
			{ type: 'image', url: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/EasyCooking/EasyCooking%20Gallery/Untitled%2019b9-0bbe/Screenshot_2024-09-29_alle_15.54.39.png`, thumb: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/EasyCooking/EasyCooking%20Gallery/Untitled%2019b9-0bbe/Screenshot_2024-09-29_alle_15.54.39.png`, title: 'Color Grade & DaVinci Timeline' },
		],
		'line-operator': [
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Line%20Operator/KxDAsD.png`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Line%20Operator/KxDAsD.png`, title: 'Cold War Control Room & 3D Props' },
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Line%20Operator/HIc0z.png`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Line%20Operator/HIc0z.png`, title: 'Interactive Puzzle Machines (3D Modeling)' },
		],
		'nihil': [
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Nihil/IXYPN-.gif`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Nihil/IXYPN-.gif`, title: 'Combat Mechanics & Animations' },
			{ type: 'image', url: `${baseUrl}/projects/Game_Development/Gamedev/Nihil/sssOhB.gif`, thumb: `${baseUrl}/projects/Game_Development/Gamedev/Nihil/sssOhB.gif`, title: 'Character Transformation Sequence' },
		],
		'ziva': [
			{ type: 'image', url: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/Ziva/canvas_moodboard-ci-250221_1201.png`, thumb: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/Ziva/canvas_moodboard-ci-250221_1201.png`, title: 'VR 360° Moodboard & Visual Research' },
			{ type: 'image', url: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/Ziva/gifCI.gif`, thumb: `${baseUrl}/projects/Short_Movie_Production/Short%20Movie%20List/Ziva/gifCI.gif`, title: '360° Spherical Production Sequence' },
		],
	};
}

export function getShowreelSlides(baseUrl: string): ShowreelSlide[] {
	return [
		{
			title: 'PulseEngine :: Volumetric Raymarching',
			sub: 'Unity 6 · HLSL Compute · CSG Morphing · Quest 3',
			tag: 'MEDICAL XR',
			metric: '2.91ms GPU (-61.3%) · 90 FPS · 0B GC',
			image: `${baseUrl}/videos/pulse-engine/bouba_kiki_morph_poster.jpg`,
			video: `${baseUrl}/videos/pulse-engine/bouba_kiki_morph.mp4`,
			projectId: 'thesis-medical-xr',
		},
		{
			title: 'Graphics Lab :: Custom C++ Engine',
			sub: 'C++17 · OpenGL 3.3 / 4.6 Core · Deferred Shading · Cook-Torrance PBR',
			tag: 'ENGINE DEV',
			metric: 'G-Buffer MRT · Silhouette POM · RenderDoc',
			image: `${baseUrl}/projects/graphics-lab/hero.png`,
			video: `${baseUrl}/videos/graphics-lab/PBR_Screen.mp4`,
			projectId: 'graphics-lab',
		},
		{
			title: 'WebGPU 2D Global Illumination :: Compute Lab',
			sub: 'WebGPU · 8 Hand-Written WGSL Kernels · JFA SDF · Shared-Memory Bloom',
			tag: 'COMPUTE // WGSL',
			metric: '15 Dispatches/Frame · 5-Stage Pass Inspector',
			image: `${baseUrl}/videos/webgpu-2d-gi/demo_poster.jpg`,
			video: `${baseUrl}/videos/webgpu-2d-gi/demo.mp4`,
			projectId: 'webgpu-2d-gi',
		},
		{
			title: 'Stylized 3D Gaussian Splats :: NPR Toolchain',
			sub: 'Blender 5.3 Beta · Geometry Nodes · Vector Flow Fields · EEVEE-Next',
			tag: '3DGS // NPR',
			metric: 'OpenUSD PointClouds · 60 FPS Viewport Kuwahara',
			image: `${baseUrl}/videos/stylized-gaussian/demonstration_poster.jpg`,
			video: `${baseUrl}/videos/stylized-gaussian/demonstration.mp4`,
			projectId: 'stylized-gaussian-splats',
		},
		{
			title: 'Smart Cable Generator :: Blender Add-on',
			sub: 'Python 3 · Catenary Physics · Procedural Curve Authoring',
			tag: 'TOOLING',
			metric: 'Automated Multi-Surface Snapping & Export',
			image: `${baseUrl}/covers/Smart Cable Generator.jpg`,
			video: `${baseUrl}/projects/pipeline-tools/cable_demo_3.mp4`,
			projectId: 'smart-cable-generator',
		},
		{
			title: 'UE5 Procedural Environments',
			sub: 'Unreal Engine 5 · PCG Graph · Megascans Biomes · Nanite',
			tag: 'TECH ART',
			metric: 'Slope/Altitude Auto-Materials · Dynamic Weather',
			image: `${baseUrl}/covers/UE5 Tech Art Showcase.png`,
			video: `${baseUrl}/videos/tech-art/a1_pcg.mp4`,
			projectId: 'ue5-procedural-environment',
		},
		{
			title: 'Harmony VR :: Singing the Light',
			sub: 'Unity 6 · OpenXR · Real-Time Vocal Cymatics',
			tag: 'XR GAME',
			metric: 'Spatial Audio Interaction · Meta Quest',
			image: `${baseUrl}/projects/Game_Development/Gamedev/Harmony/harmony_live_demo_poster.jpg`,
			video: `${baseUrl}/projects/Game_Development/Gamedev/Harmony/harmony_live_demo.mp4`,
			projectId: 'harmony',
		},
	];
}
