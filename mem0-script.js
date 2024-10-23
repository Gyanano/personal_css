// Mem0 功能脚本

let sidebarVisible = false;
let memoryEnabled = true;

// 初始化函数
function initializeMem0() {
  createSidebar();
  setupEventListeners();
}

// 创建侧边栏
function createSidebar() {
  if (document.getElementById("mem0-sidebar")) {
    return;
  }

  const sidebarContainer = document.createElement("div");
  sidebarContainer.id = "mem0-sidebar";
  sidebarContainer.style.cssText = `
    position: fixed; 
    top: 10px;
    right: -400px;
    color: #000;
    width: 400px;
    height: calc(100vh - 20px);
    background-color: #ffffff;
    z-index: 2147483647;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    box-sizing: border-box;
    overflow-y: auto;
    border-radius: 10px;
    margin-right: 10px;
  `;

  // 创建侧边栏内容
  sidebarContainer.innerHTML = `
    <div class="fixed-header">
      <div class="header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="logo-container">
          <img src="mem0-logo.png" alt="Mem0 Logo" class="logo">
        </div>
        <div class="header-buttons">
          <button id="searchBtn" class="header-icon-button" title="Search Memories">
            <img src="search.svg" alt="Search" class="svg-icon">
          </button>
          <button id="addMemoryBtn" class="header-icon-button" title="Add Memory">
            <img src="add.svg" alt="Add Memory" class="svg-icon">
          </button>
          <button id="ellipsisMenuBtn" class="header-icon-button" title="More options">
            <img src="ellipsis.svg" alt="More options" class="svg-icon">
          </button>
        </div>
      </div>
    </div>
    <div class="scroll-area">
      <div class="loading-indicator">
        <div class="loader"></div><br/>
        <p style="font-size: 12px; color: #888;">Loading memories...</p>
      </div>
    </div>
    <div class="footer-toggle">
      <span class="shortcut-text">Mem0 Shortcut: ⌘ + m</span>
      <div class="toggle-container">
        <span class="toggle-text">Memory enabled</span>
        <label class="switch">
          <input type="checkbox" id="mem0Toggle" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  `;

  document.body.appendChild(sidebarContainer);
}

// 设置事件监听器
function setupEventListeners() {
  document.getElementById("searchBtn").addEventListener("click", toggleSearch);
  document.getElementById("addMemoryBtn").addEventListener("click", addNewMemory);
  document.getElementById("ellipsisMenuBtn").addEventListener("click", toggleEllipsisMenu);
  document.getElementById("mem0Toggle").addEventListener("change", toggleMemory);
}

// 切换侧边栏显示
function toggleSidebar() {
  const sidebar = document.getElementById("mem0-sidebar");
  sidebarVisible = !sidebarVisible;
  sidebar.style.right = sidebarVisible ? "0px" : "-400px";

  if (sidebarVisible) {
    fetchAndDisplayMemories();
  }
}

// 搜索记忆
function toggleSearch() {
  // 实现搜索功能
  console.log("Search functionality to be implemented");
}

// 添加新记忆
function addNewMemory() {
  // 实现添加新记忆功能
  console.log("Add new memory functionality to be implemented");
}

// 切换更多选项菜单
function toggleEllipsisMenu() {
  // 实现更多选项菜单功能
  console.log("Ellipsis menu functionality to be implemented");
}

// 切换记忆功能
function toggleMemory() {
  memoryEnabled = !memoryEnabled;
  const toggleText = document.querySelector(".toggle-text");
  toggleText.textContent = memoryEnabled ? "Memory enabled" : "Memory disabled";
  // 这里可以添加更多与切换记忆相关的逻辑
}

// 获取并显示记忆
function fetchAndDisplayMemories() {
  // 这里应该实现从API获取记忆并显示的逻辑
  console.log("Fetching and displaying memories to be implemented");
}

// 初始化Mem0功能
initializeMem0();

// 暴露toggleSidebar函数，以便可以从外部调用
window.toggleMem0Sidebar = toggleSidebar;
