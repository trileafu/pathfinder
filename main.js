import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const element = document.getElementById('renderer');
const camera = new THREE.PerspectiveCamera(60, element.getBoundingClientRect().width / element.getBoundingClientRect().height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(element.getBoundingClientRect().width, element.getBoundingClientRect().height);
element.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight('white', 8);
const ambientLight = new THREE.AmbientLight('white', 2);
light.castShadow = true;
light.shadowDarkness = 0.7;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
scene.add(light, ambientLight); 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 3 * 2;
controls.minAzimuthAngle = -Math.PI / 3;
controls.maxAzimuthAngle = Math.PI / 3;

const textureLoader = new THREE.TextureLoader();

let currentInput = -1;

function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
    let inputText = "";
    input.forEach((step, index) => {
        switch(step) {
            case 0:
                step = "˄"
                break;
            case 1:
                step = "˃"
                break;
            case 3:
                step = "˂"
                break;
            case 2:
                step = "˅"
                break;
        }
        if(index == currentInput) inputText += `<b>${step}</b> `
        else inputText += `${step} `
    });
    controls.update();
    document.getElementById('input').innerHTML = inputText;
    light.position.set(camera.position.x, camera.position.y + 10, camera.position.z);
}

animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){

    camera.aspect = element.getBoundingClientRect().width / element.getBoundingClientRect().height;
    camera.updateProjectionMatrix();

    renderer.setSize( element.getBoundingClientRect().width, element.getBoundingClientRect().height );

}

function generateWall(x, y, fside, findex){
    const material = new THREE.MeshStandardMaterial({ color: "red" });
    const vertical = new THREE.BoxGeometry( x, .5, 1 );
    const horizontal = new THREE.BoxGeometry( .5, y + 1, 1 );

    if(fside == 0) {
        const top1 = new THREE.Mesh( new THREE.BoxGeometry( findex, .5, 1 ), material ); 
        scene.add(top1);
        top1.position.x = (findex) / 2;
        top1.position.y = .25;
        top1.position.z = .5;
        top1.castShadow = true;
        top1.receiveShadow = true;
        const top2 = new THREE.Mesh( new THREE.BoxGeometry( x - findex - 1, .5, 1 ), material ); 
        scene.add(top2);
        top2.position.x = x - (x - findex - 1) / 2;
        top2.position.y = .25;
        top2.position.z = .5;
        top2.castShadow = true;
        top2.receiveShadow = true;
    }
    else {
        const top = new THREE.Mesh( vertical, material ); 
        scene.add(top);
        top.position.x = x / 2;
        top.position.y = .25;
        top.position.z = .5;
        top.castShadow = true;
        top.receiveShadow = true;
    }

    if(fside == 2) {
        const bottom1 = new THREE.Mesh( new THREE.BoxGeometry( findex, .5, 1 ), material ); 
        scene.add(bottom1);
        bottom1.position.x = (findex) / 2;
        bottom1.position.y = -y - .25;
        bottom1.position.z = .5;
        bottom1.castShadow = true;
        bottom1.receiveShadow = true;
        const bottom2 = new THREE.Mesh( new THREE.BoxGeometry( x - findex - 1, .5, 1 ), material ); 
        scene.add(bottom2);
        bottom2.position.x = x - (x - findex - 1) / 2;
        bottom2.position.y = -y - .25;
        bottom2.position.z = .5;
        bottom2.castShadow = true;
        bottom2.receiveShadow = true;
    }
    else {
        const bottom = new THREE.Mesh( vertical, material ); 
        scene.add(bottom);
        bottom.position.x = x / 2;
        bottom.position.y = -y - .25;
        bottom.position.z = .5;
        bottom.castShadow = true;
        bottom.receiveShadow = true;
    }

    if(fside == 3) {
        const left1 = new THREE.Mesh( new THREE.BoxGeometry( .5, findex + .5, 1 ), material ); 
        scene.add(left1);
        left1.position.x = -.25;
        left1.position.y = -findex / 2 + .25;
        left1.position.z = .5;
        left1.castShadow = true;
        left1.receiveShadow = true;
        const left2 = new THREE.Mesh( new THREE.BoxGeometry( .5, y - findex - 1 + .5, 1 ), material ); 
        scene.add(left2);
        left2.position.x = -.25;
        left2.position.y = -y + (y - findex) / 2 - .75;
        left2.position.z = .5;
        left2.castShadow = true;
        left2.receiveShadow = true;
    }
    else {
        const left = new THREE.Mesh( horizontal, material ); 
        scene.add(left);
        left.position.x = -.25;
        left.position.y = -y / 2;
        left.position.z = .5;
        left.castShadow = true;
        left.receiveShadow = true;
    }

    if(fside == 1) {
        const right1 = new THREE.Mesh( new THREE.BoxGeometry( .5, findex + .5, 1 ), material ); 
        scene.add(right1);
        right1.position.x = x + .25;
        right1.position.y = -findex / 2 + .25;
        right1.position.z = .5;
        right1.castShadow = true;
        right1.receiveShadow = true;
        const right2 = new THREE.Mesh( new THREE.BoxGeometry( .5, y - findex - 1 + .5, 1 ), material ); 
        scene.add(right2);
        right2.position.x = x + .25;
        right2.position.y = -y + (y - findex) / 2 - .75;
        right2.position.z = .5;
        right2.castShadow = true;
        right2.receiveShadow = true;
    }
    else {
        const right = new THREE.Mesh( horizontal, material ); 
        scene.add(right);
        right.position.x = x + .25;
        right.position.y = -y / 2;
        right.position.z = .5;
        right.castShadow = true;
        right.receiveShadow = true;
    }

}

function generatePlane(x, y, fside, findex){
    console.log("X" + x)
    const geometry = new THREE.PlaneGeometry(x, y);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide, roughness: 0 });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.receiveShadow = true;
    plane.position.x = x / 2;
    plane.position.y = -y / 2;
    camera.position.x = x / 2;
    camera.position.y = Math.min(-10, -x, -y);
    camera.position.z = Math.max(10, x, y);
    camera.lookAt(x / 2, -y / 2, 0);
    controls.target.set(x / 2, -y / 2, 0.5);
    controls.saveState();
    light.target = plane;
    generateWall(x, y, fside, findex);
}

function addCube(x, y){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
    cube.position.x = x + .5;
    cube.position.y = -y - .5;
    cube.position.z = 0.5;
    console.log(cube.position);
}

function addStarting(x, y) {
    const sphere = new THREE.Mesh( new THREE.SphereGeometry(.5), new THREE.MeshStandardMaterial({ color: 0xff00ff })); 
    scene.add(sphere);
    sphere.position.x = x + .5;
    sphere.position.y = -y - .5;
    sphere.position.z = 0.5;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    return sphere;
}

function getMove(row, left, position) {
    console.log(row);
    if(left) {
        if(position == 0) {
            return 0;
        }
        for(let pos = position - 1; pos >= 0; pos--) {
            if(pos == 0 && row[pos] == 0) {
                return 0;
            }
            if(row[pos] != 0) {
                return pos + 1;
            }
        }
    }
    else {
        if(position == row.length - 1) {
            return row.length - 1;
        }
        for(let pos = position + 1; pos < row.length; pos++) {
            if(pos == row.length - 1 && row[pos] == 0) {
                return row.length - 1;
            }
            if(row[pos] != 0) {
                return pos - 1;
            }
        }
    }
}

function getColumn(blocks, cindex) {
    let column = [];
    blocks.forEach((row, ri) => {
        if(row[cindex] != null) {
            column.push(row[cindex]);
        }
    })
    return column;
}

async function move(object, direction, blocks, finish) {
    return new Promise(async resolve => {
        console.log(`x${object.position.x - .5} y${-object.position.y - .5}`)
        switch(direction) {
            case 0:
                if(finish.side == 0 && finish.index == object.position.x - .5) {
                    await animatePosition(object, 1.25, 0);
                    gameOver(true);
                }
                await animatePosition(object, -getMove(getColumn(blocks, object.position.x - .5), true, -object.position.y - .5) - .5, 0);
                setTimeout(() => {
                    resolve();
                }, 500);
                break;
            case 1:
                if(finish.side == 1 && finish.index == -object.position.y - .5) {
                    await animatePosition(object, blocks[0].length + 1.25, 1);
                    gameOver(true);
                }
                await animatePosition(object, getMove(blocks[-object.position.y - .5], false, object.position.x - .5) + .5, 1);
                setTimeout(() => {
                    resolve();
                }, 500);
                break;
            case 2:
                if(finish.side == 2 && finish.index == object.position.x - .5) {
                    await animatePosition(object, -blocks.length - 1.25, 2);
                    gameOver(true);
                }
                await animatePosition(object, -getMove(getColumn(blocks, object.position.x - .5), false, -object.position.y - .5) - .5, 2);
                setTimeout(() => {
                    resolve();
                }, 500);
                break;
            case 3:
                if(finish.side == 3 && finish.index == -object.position.y - .5) {
                    await animatePosition(object, -1.25, 3);
                    gameOver(true);
                }
                await animatePosition(object, getMove(blocks[-object.position.y - .5], true, object.position.x - .5) + .5, 3);
                setTimeout(() => {
                    resolve();
                }, 500);
        }
    });
}

async function animatePosition(object, target, direction) {
    return new Promise(resolve => {
        let loop;
        switch(direction) {
            case 0:
                loop = setInterval(() => {
                    if(object.position.y < target) {
                        object.position.y += 0.1;
                    }
                    else {
                        object.position.y = target;
                        clearInterval(loop);
                        resolve();
                    }
                }, 20);
                break;
            case 1:
                loop = setInterval(() => {
                    if(object.position.x < target) {
                        object.position.x += 0.1;
                    }
                    else {
                        object.position.x = target;
                        clearInterval(loop);
                        resolve();
                    }
                }, 20);
                break;
            case 2:
                loop = setInterval(() => {
                    if(object.position.y > target) {
                        console.log(object.position.y)
                        object.position.y -= 0.1;
                    }
                    else {
                        object.position.y = target;
                        clearInterval(loop);
                        resolve();
                    }
                }, 20);
                break;
            case 3:
                loop = setInterval(() => {
                    if(object.position.x > target) {
                        object.position.x -= 0.1;
                    }
                    else {
                        object.position.x = target;
                        clearInterval(loop);
                        resolve();
                    }
                }, 20);
                break;
        }
    });
}

function gameStart(map) {
    generatePlane(map.blocks[0].length, map.blocks.length, map.finish.side, map.finish.index);
    map.blocks.forEach((row, ri) => {
        row.forEach((block, bi) => {
            if(block == 1) {
                addCube(bi, ri);
            }
        })
    })
    return addStarting(map.starting[0], map.starting[1]);
}
window.gameStart = gameStart;

function addInput(input, direction, moved, limit) {
    if(moved) return;
    document.getElementById("input").scrollLeft += 100000000000000;
    if(input.length >= limit) {
        document.getElementById("input").classList.remove("overflow");
        document.getElementById("input").classList.add("overflow");
        setTimeout(() => {
            document.getElementById("input").classList.remove("overflow");
        }, 500);
        return;
    };
    input.push(direction);
}
window.addInput = addInput;

function resetInput(input, moved) {
    if(moved) return;
    input.length = 0;
}
window.resetInput = resetInput;

async function playerMove(input, object, blocks, moved) {
    if(moved) return;
    controls.enabled = false;
    controls.reset();
    for (let i = 0; i < input.length; i++) {
        currentInput = i;
        await move(object, input[i], blocks, map.finish);
    }
    gameOver(false);
}
window.playerMove = playerMove;

let over = false;

function gameOver(win) {
    currentInput = -1;
    document.getElementById("popup").style.zIndex = 1;
    document.getElementById("popup").style.backgroundColor = "rgba(0, 0, 0, 0.25)";
    if(over) return;
    if(win) {
        document.getElementById("win").style.scale = 1;
        over = true;
    }
    else {
        document.getElementById("lose").style.scale = 1;
    }
}