<template>
    <section>
        <animation-font></animation-font>
        <div id="container"></div>
    </section>
</template>

<script>
    // import * as THREE from 'three';
    // import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js';
    // import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
    // import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
    // import AnimationFont from "../components/animation-font";

    // import * as THREE from '../build/three.module.js';
    // import { TWEEN } from './jsm/libs/tween.module.min.js';
    // import { TrackballControls } from './jsm/controls/TrackballControls.js';
    // import { CSS3DRenderer, CSS3DObject } from './jsm/renderers/CSS3DRenderer.js';

    export default {
        name: "nav3D",
        // components: {AnimationFont},
        data() {
            return {
                table : [
                ],
                renderer : null,
                camera : null,
                scene : null,
                controls : null,
                objects  : [],
                targets   : { table: [], sphere: [], helix: [], grid: [] },
            }
        },
        destroyed (){
            this.clear();
        },
        deactivated (){
            this.clear();
        },
        created (){
            this.table = [];
            this.table = this.table.concat([this.$t('home.home2'), 'задолженность', '/shoukuan']);
            this.table = this.table.concat([this.$t('home.home4'), 'передача', '/zhuanqian/XRP']);
            this.table = this.table.concat([this.$t('shareAPP'), 'Поделиться приложением', '/download']);
            this.table = this.table.concat([this.$t('my'), 'мой', '/user']);
            this.table = this.table.concat([this.$t('home.home'), 'дома', '/home']);
            this.table = this.table.concat(['DAPP', 'прикладн', '/dapp']);
            this.table = this.table.concat([this.$t('accountManagement'), 'Управление аккаунтом', '/accountManage']);
            this.table = this.table.concat([this.$t('wallet.name'), 'бумажник', '/wallet']);
            this.table = this.table.concat([this.$t('inviteTitle'), 'Пригласить друзей', '/invite']);
            this.table = this.table.concat([this.$t('inviteTitle'), 'Пригласить друзей', '/invite']);
            this.table = this.table.concat([this.$t('langSet'), 'Настройки языка', '/lang']);
            this.table = this.table.concat([this.$t('wallet.jilu'), 'запись', '/acceptCoin']);
            this.table = this.table.concat([this.$t('Trust the gateway'), 'Верь шлюзу.', '/gateway']);
        },
        mounted (){
            this.init();
            this.animate();
        },
        methods : {
            hide (){
                this.$store.commit('nav3DState', false);
            },
            clear (){
                let {scene, controls} = this;
                if(scene){
                    scene.dispose();
                    this.scene = null;
                }
                if(controls){
                    controls.dispose();
                    this.controls = null;
                }
            },
            init() {
                let {renderer, camera, scene, controls, objects, targets, transform , table} = this;
                camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
                this.camera = camera;
                camera.position.z = 3000;
                scene = new THREE.Scene();
                this.scene = scene;
                var that = this;
                // table
                for ( let i = 0; i < table.length; i += 3 ) {
                    let element = document.createElement( 'div' );
                    element.className = 'element';
                    element.style.backgroundColor = 'rgba(0,0,0, 0.8)';
                    var symbol = document.createElement( 'div' );
                    symbol.className = 'symbol';
                    symbol.textContent = table[ i ];
                    element.appendChild( symbol );
                    var details = document.createElement( 'div' );
                    details.className = 'details';
                    details.innerHTML = table[ i + 1 ];
                    element.appendChild( details );
                    let touchTime = 0;
                    element.addEventListener("touchstart", function (){
                        touchTime = Date.now();
                        console.log('touchstart');
                    });
                    element.addEventListener("touchmove", function (){
                        // touchTime = 0;
                        console.log('touchmove');
                    });
                    element.addEventListener("touchend", function (){
                        if((Date.now() - touchTime) < 500 && (Date.now() - touchTime) > 50){
                            // if(table[ i + 2 ]){
                            //     that.$router.push(table[ i + 2 ]);
                            // }else{
                            //     that.$toast.show(that.$t('dispark'));
                            // }
                            that.hide();
                            console.log('touchend');
                        }
                    });
                    var object = new CSS3DObject( element );
                    object.position.x = Math.random() * 4000 - 2000;
                    object.position.y = Math.random() * 4000 - 2000;
                    object.position.z = Math.random() * 4000 - 2000;
                    scene.add( object );
                    objects.push( object );
                }
                // sphere
                var vector = new THREE.Vector3();
                for ( var i = 0, l = objects.length; i < l; i ++ ) {
                    var phi = Math.acos( - 1 + ( 2 * i ) / l );
                    var theta = Math.sqrt( l * Math.PI ) * phi;
                    var object = new THREE.Object3D();
                    object.position.setFromSphericalCoords( 400, phi, theta );
                    vector.copy( object.position ).multiplyScalar( 2 );
                    object.lookAt( vector );
                    targets.sphere.push( object );
                }

                renderer = new CSS3DRenderer();
                this.renderer = renderer;
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.getElementById( 'container' ).appendChild( renderer.domElement );
                //
                controls = new TrackballControls( camera, renderer.domElement );
                this.controls = controls;
                controls.enabled = true;
                controls.minDistance = 1000;
                controls.maxDistance = 6000;
                controls.noPan = true;
                controls.rotationSpeed = 0.5;
                controls.addEventListener( 'change', this.render );

                transform( targets.sphere, 2000 );
                //
                window.addEventListener( 'resize', this.onWindowResize, false );
            },
            transform( targets, duration ) {
                let { objects} = this;
                TWEEN.removeAll();
                for ( var i = 0; i < objects.length; i ++ ) {
                    var object = objects[ i ];
                    var target = targets[ i ];
                    new TWEEN.Tween( object.position )
                        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                        .easing( TWEEN.Easing.Exponential.InOut )
                        .start();
                    new TWEEN.Tween( object.rotation )
                        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                        .easing( TWEEN.Easing.Exponential.InOut )
                        .start();
                }
                new TWEEN.Tween( this )
                    .to( {}, duration * 2 )
                    .onUpdate( this.render )
                    .start();
            },
            onWindowResize() {
                let {renderer, camera} = this;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
                this.render();
            },
            animate() {
                let {controls, animate } = this;
                if(this.controls){
                    requestAnimationFrame( animate );
                    TWEEN.update();
                    controls.update();
                }
            },
            render() {
                let {renderer, camera, scene} = this;
                renderer.render( scene, camera );
            }
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        background-color: #000;
        color: #333;
        font-family: Monospace;
        font-size: 13px;
        line-height: 24px;
        overscroll-behavior: none;
    }
    #container{
        height: 100%;
        width: 100%;
        position: relative;
        z-index: 10;
        background: rgba(0,0,0,0.7);
    }
    a {
        color: #ff0;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        cursor: pointer;
        text-transform: uppercase;
    }

    canvas {
        display: block;
    }

    #info {
        position: absolute;
        top: 0px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        pointer-events: none;
        z-index: 1; /* TODO Solve this in HTML */
    }

    a, button, input, select {
        pointer-events: auto;
    }

    .dg.ac {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2 !important; /* TODO Solve this in HTML */
    }

    #overlay {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        background-color: #000000;
        color: #ffffff;
    }

    #overlay > div {
        text-align: center;
    }

    #overlay > div > button {
        height: 20px;
        background: transparent;
        color: #ffffff;
        outline: 1px solid #ffffff;
        border: 0px;
        cursor: pointer;
    }

    #overlay > div > p {
        color: #777777;
        font-size: 12px;
    }
    a {
        color: #8ff;
    }
    #menu {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
    }
    .element {
        width: 120px;
        height: 160px;
        box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
        border: 1px solid rgba(127,255,255,0.25);
        font-family: Helvetica, sans-serif;
        text-align: center;
        line-height: normal;
        cursor: default;
    }
    .element:hover {
        box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
        border: 1px solid rgba(127,255,255,0.75);
    }
    .element .number {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 12px;
        color: rgba(127,255,255,0.75);
    }
    .element .symbol {
        position: absolute;
        top: 20px;
        left: 0px;
        right: 0px;
        font-size: 32px;
        font-weight: bold;
        line-height: 1;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(0,255,0,0.75);
        text-shadow: 0 0 10px rgba(127,255,255,0.95);
        word-wrap:break-word;
    }
    .element .details {
        position: absolute;
        bottom: 15px;
        left: 0px;
        right: 0px;
        font-size: 12px;
        color: rgba(0,255,0,0.75);
    }

</style>