     // 清除控制台
     console.clear()
     const eyeContainer = document.querySelector('.eye-container')
     // 创建眼睛
     for (let i = 0; i < 81; i++) {
         createEye()
     }
     // 获取所有眼睛
     const eyes = document.querySelectorAll('.eye')
     // 函数：创建眼睛
     function createEye() {
         const eye = document.createElement('div')
         const pupil = document.createElement('div')
         eye.className = 'eye'
         pupil.className = 'pupil'
         eye.appendChild(pupil)
         eyeContainer.appendChild(eye)
     }
     // 鼠标移动事件：更新瞳孔位置
     document.body.onpointermove = (e) => {
         eyes.forEach((eye) => {
             const pupil = eye.querySelector('.pupil')
             // 获取眼睛的中心点
             const eyeRect = eye.getBoundingClientRect()
             const eyeCenterX = eyeRect.left + eyeRect.width / 2
             const eyeCenterY = eyeRect.top + eyeRect.height / 2
             // 计算距离比例
             const dx = (e.clientX - eyeCenterX) / eyeRect.width
             const dy = (e.clientY - eyeCenterY) / eyeRect.height
             // 计算瞳孔新的x, y位置，限制其不能超出眼睛的范围
             const distance = Math.sqrt(dx * dx + dy * dy)
             const maxDistance = 0.9// 允许的最大偏移量比例
             const clampedDistance = Math.min(distance, maxDistance)
             // 计算吸附效果
             const angle = Math.atan2(dy, dx)
             const pupilX = Math.cos(angle) * clampedDistance * (eyeRect.width / 2 - pupil.offsetWidth / 2)
             const pupilY = Math.sin(angle) * clampedDistance * (eyeRect.height / 2 - pupil.offsetHeight / 2)
             // 更新瞳孔位置
             pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`
             // 动态更新内阴影效果，阴影在瞳孔的对立面
             const shadowOffsetX = pupilX / 4;
             const shadowOffsetY = pupilY / 2;
             const shadowBlur = 10; // 模糊半径
             eye.style.boxShadow =
                 `inset ${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, 0.4)`;
         })
     }
     // 鼠标离开事件：重置瞳孔位置和内阴影
     document.body.onpointerleave = () => {
         eyes.forEach((eye) => {
             const pupil = eye.querySelector('.pupil')
             pupil.style.transform = 'translate(0, 0)'
             // 重置内阴影，保留模糊效果
             eye.style.boxShadow = 'inset 0px 0px 10px rgba(0, 0, 0, 0.4)';
         })
     }
