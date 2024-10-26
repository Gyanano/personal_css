document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('floatingWidget');

    function activeMenu() {
        if (widget && !widget.classList.contains('active')) {
            widget.classList.remove('inactive');
            widget.classList.add('active');
        }
    }

    function deactiveMenu() {
        if (widget && widget.classList.contains('active')) {
            widget.classList.remove('active');
            widget.classList.add('inactive');
        }
    }

    if (widget) {
        document.addEventListener('click', (e) => {
            if (!widget.contains(e.target)) {
                deactiveMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && widget.classList.contains('active')) {
                deactiveMenu();
            }
        });

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                handleMenuItemClick(value);
            });
        });

        // 将 activeMenu 函数添加到全局作用域
        window.activeMenu = activeMenu;
    }
});

/**
 * 导出消息逻辑
 */

function consoleSave(console, fileType, title = '') {
    console.save = function (data) {
        let mimeType = "text/plain";

        let filename = title ? title.trim().toLowerCase().replace(/^[^\w\d]+|[^\w\d]+$/g, '').replace(/[\s\W-]+/g, '-') : "claude";
        if (fileType.toLowerCase() === "json") {
            filename += ".json";
            mimeType = "text/json";

            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4);
            }
        } else if (fileType.toLowerCase() === "md") {
            filename += ".md";
        }

        var blob = new Blob([data], { type: mimeType });
        var a = document.createElement("a");

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = [mimeType, a.download, a.href].join(":");
        var e = new MouseEvent("click", {
            canBubble: true,
            cancelable: false,
            view: window,
            detail: 0,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            relatedTarget: null,
        });

        a.dispatchEvent(e);
    };
}

function getTimeStamp() {
    return new Date(
        new Date(new Date(new Date()).toISOString()).getTime() -
        new Date().getTimezoneOffset() * 60000
    ).toISOString()
        .slice(0, 19).replace("T", " ");
}

function getContents() {
    // get the contents by selector
    const chatContainer = document.querySelector(
        "div.flex-1.flex.flex-col.gap-3.px-4"
    );

    const titleEle = document.querySelector(
        "button[data-testid='chat-menu-trigger']"
    );

    // Find all chat elements
    const elements = chatContainer.querySelectorAll(
        "div.font-claude-message, div.font-user-message"
    );

    return {
        elements,
        title: titleEle.textContent,
    };
}

function exportMsgToJson() {
    const chats = [];
    const json = {
        meta: {
            exported_at: getTimeStamp(),
        },
    };

    const { elements, title } = getContents();

    if (title) {
        json.meta.title = title;
    }

    // add all chat contents to json
    for (let i = 0; i < elements.length; i++) {
        let ele = elements[i];
        let object = {
            index: i,
        };
        var message = [];

        // Get first child of current element
        var firstChild = ele.firstElementChild;
        if (!firstChild) continue;

        // Element child
        if (firstChild.nodeType === Node.ELEMENT_NODE) {
            var childNodes = []

            // Element child
            if (ele.classList.contains("font-claude-message")) {
                object.type = "response";
                let secondChild = firstChild.firstChild;
                if (!secondChild) {
                    secondChild = firstChild;
                }
                childNodes = secondChild.childNodes;
            } else {
                object.type = "prompt";
                childNodes = ele.childNodes;
            }

            // Parse child elements
            for (var n = 0; n < childNodes.length; n++) {
                const childNode = childNodes[n];

                if (childNode.nodeType === Node.ELEMENT_NODE) {
                    var tag = childNode.tagName;
                    var text = childNode.textContent;
                    // Paragraphs
                    if (tag === "P") {
                        message.push({
                            type: "p",
                            data: text,
                        });
                    }

                    // Get list items
                    if (tag === "OL" || tag === "UL") {
                        const listItems = [];
                        childNode.childNodes.forEach((listItemNode, index) => {
                            if (
                                listItemNode.nodeType === Node.ELEMENT_NODE &&
                                listItemNode.tagName === "LI"
                            ) {
                                listItems.push({
                                    type: "li",
                                    data: listItemNode.textContent,
                                });
                            }
                        });

                        if (tag === "OL") {
                            message.push({
                                type: "ol",
                                data: listItems,
                            });
                        }
                        if (tag === "UL") {
                            message.push({
                                type: "ul",
                                data: listItems,
                            });
                        }
                    }

                    // Code blocks
                    if (tag === "PRE") {
                        const codeEle = childNode.querySelector("code");
                        const codeText = codeEle.textContent;
                        const codeBlockLang = codeEle.classList[0].split("-")[1];

                        message.push({
                            type: "pre",
                            language: codeBlockLang,
                            data: codeText,
                        });
                    }

                    // Tables
                    if (tag === "TABLE") {
                        const tableSections = [];

                        // Get table sections
                        childNode.childNodes.forEach((tableSectionNode) => {
                            if (
                                tableSectionNode.nodeType === Node.ELEMENT_NODE &&
                                (tableSectionNode.tagName === "THEAD" ||
                                    tableSectionNode.tagName === "TBODY")
                            ) {
                                // Get table rows
                                const tableRows = [];
                                tableSectionNode.childNodes.forEach(
                                    (tableRowNode) => {
                                        if (
                                            tableRowNode.nodeType === Node.ELEMENT_NODE &&
                                            tableRowNode.tagName === "TR"
                                        ) {
                                            // Get table cells
                                            const tableCells = [];
                                            tableRowNode.childNodes.forEach(
                                                (tableCellNode) => {
                                                    if (
                                                        tableCellNode.nodeType ===
                                                        Node.ELEMENT_NODE &&
                                                        (tableCellNode.tagName === "TD" ||
                                                            tableCellNode.tagName === "TH")
                                                    ) {
                                                        tableCells.push({
                                                            type: tableCellNode.tagName.toLowerCase(),
                                                            data: tableCellNode.textContent,
                                                        });
                                                    }
                                                }
                                            );
                                            tableRows.push({
                                                type: "tr",
                                                data: tableCells,
                                            });
                                        }
                                    }
                                );

                                tableSections.push({
                                    type: tableSectionNode.tagName.toLowerCase(),
                                    data: tableRows,
                                });
                            }
                        });

                        message.push({
                            type: "table",
                            data: tableSections,
                        });
                    }
                }
            }
        }

        // Text child
        if (firstChild.nodeType === Node.TEXT_NODE) {
            // Prefix User prompt label
            object.type = "prompt";
            message.push(firstChild.textContent);
        }

        // Add message data to chats
        object.message = message;
        chats.push(object);
    }

    // Add chats to JSON output
    json.chats = chats;

    // Save to file interface
    consoleSave(console, "json", title);
    console.save(json);
    return json;
}

function exportMsgToMd() {
    var markdown = "";

    const { elements, title } = getContents();

    var timestamp = getTimestamp();
    markdown += `\# ${title || "Claude Chat"}\n\`${timestamp}\`\n\n`;

    for (var i = 0; i < elements.length; i++) {
        var ele = elements[i];

        // Get first child
        var firstChild = ele.firstChild;
        if (!firstChild) continue;

        // Element child
        if (firstChild.nodeType === Node.ELEMENT_NODE) {
            var childNodes = [];

            // Prefix Claude reponse label
            if (ele.classList.contains("font-claude-message")) {
                markdown += `_Claude_:\n`;
                let secondChild = firstChild.firstChild;
                if (!secondChild) {
                    secondChild = firstChild;
                }
                childNodes = secondChild.childNodes;
            } else {
                markdown += `_Prompt_:\n`;
                childNodes = ele.childNodes;
            }

            // Parse child elements
            for (var n = 0; n < childNodes.length; n++) {
                const childNode = childNodes[n];

                if (childNode.nodeType === Node.ELEMENT_NODE) {
                    var tag = childNode.tagName;
                    var text = childNode.textContent;
                    // Paragraphs
                    if (tag === "P") {
                        markdown += `${text}\n`;
                    }

                    // Get list items
                    if (tag === "OL") {
                        childNode.childNodes.forEach((listItemNode, index) => {
                            if (
                                listItemNode.nodeType === Node.ELEMENT_NODE &&
                                listItemNode.tagName === "LI"
                            ) {
                                markdown += `${index + 1}. ${listItemNode.textContent
                                    }\n`;
                            }
                        });
                    }
                    if (tag === "UL") {
                        childNode.childNodes.forEach((listItemNode, index) => {
                            if (
                                listItemNode.nodeType === Node.ELEMENT_NODE &&
                                listItemNode.tagName === "LI"
                            ) {
                                markdown += `- ${listItemNode.textContent}\n`;
                            }
                        });
                    }

                    // Code blocks
                    if (tag === "PRE") {
                        const codeEle = childNode.querySelector("code");
                        const codeText = codeEle.textContent;
                        const codeBlockLang = codeEle.classList[0].split("-")[1];

                        markdown += `\`\`\`${codeBlockLang}\n${codeText}\n\`\`\`\n`;
                    }

                    // Tables
                    if (tag === "TABLE") {
                        // Get table sections
                        let tableMarkdown = "";
                        childNode.childNodes.forEach((tableSectionNode) => {
                            if (
                                tableSectionNode.nodeType === Node.ELEMENT_NODE &&
                                (tableSectionNode.tagName === "THEAD" ||
                                    tableSectionNode.tagName === "TBODY")
                            ) {
                                // Get table rows
                                let tableRows = "";
                                let tableColCount = 0;
                                tableSectionNode.childNodes.forEach(
                                    (tableRowNode) => {
                                        if (
                                            tableRowNode.nodeType === Node.ELEMENT_NODE &&
                                            tableRowNode.tagName === "TR"
                                        ) {
                                            // Get table cells
                                            let tableCells = "";

                                            tableRowNode.childNodes.forEach(
                                                (tableCellNode) => {
                                                    if (
                                                        tableCellNode.nodeType ===
                                                        Node.ELEMENT_NODE &&
                                                        (tableCellNode.tagName === "TD" ||
                                                            tableCellNode.tagName === "TH")
                                                    ) {
                                                        tableCells += `| ${tableCellNode.textContent} `;
                                                        if (
                                                            tableSectionNode.tagName === "THEAD"
                                                        ) {
                                                            tableColCount++;
                                                        }
                                                    }
                                                }
                                            );
                                            tableRows += `${tableCells}|\n`;
                                        }
                                    }
                                );

                                tableMarkdown += tableRows;

                                if (tableSectionNode.tagName === "THEAD") {
                                    const headerRowDivider = `| ${Array(tableColCount)
                                        .fill("---")
                                        .join(" | ")} |\n`;
                                    tableMarkdown += headerRowDivider;
                                }
                            }
                        });
                        markdown += tableMarkdown;
                    }

                    // Paragraph break after each element
                    markdown += "\n";
                }
            }
        }

        // Text child
        if (firstChild.nodeType === Node.TEXT_NODE) {
            // Prefix User prompt label
            // markdown += `_Prompt_: \n`;
            // markdown += `${firstChild.textContent}\n`;

            // End of prompt paragraphs breaks
            markdown += "\n";
        }
    }

    // Save to file
    consoleSave(console, "md", title);
    console.save(markdown);
    return markdown;
}

function exportMsgToImage() {
    const messageContainer = document.querySelector(
        "div.flex-1.flex.flex-col.gap-3.px-4"
    );

    const { title } = getContents();
    let filename = title ? title.trim().toLowerCase().replace(/^[^\w\d]+|[^\w\d]+$/g, '').replace(/[\s\W-]+/g, '-') : "claude_message";
    
    messageContainer.prepend(`<h1>${title}</h1>`);
    
    html2canvas(
        messageContainer, {
            logging: true,
            letterRendering: 1,
            foreignObjectRendering: false,
        }
    ).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image
        link.download = `${filename}.png`
        link.click();
        canvas.remove();
    });
}

function handleMenuItemClick(value) {
    switch (value) {
        case 'export_msg_to_json':
            exportMsgToJson();
            break;
        case 'export_msg_to_md':
            exportMsgToMd();
            break;
        case 'export_msg_to_img':
            exportMsgToImage();
            break;
        default:
            break;
    }
}