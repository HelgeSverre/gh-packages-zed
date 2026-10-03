# 🤖 Zed Agent Skills

This repository is a collection of Markdown (`.md`) files that serve as custom prompts and skills to enhance the capabilities of AI Agents within the **[Zed Editor](https://zed.dev/)**.

## 📦 Available Skills

| Skill File | Description |
| :--- | :--- |
| <nobr>[`skills/git-commit-skill.md`](./skills/git-commit-skill.md)</nobr> | Generates accurate Git commit messages from diffs following Conventional Commits standards, strictly scoped to output only the message. |

## 🚀 How to Use

Zed Agent supports fetching skills directly from Markdown files hosted on GitHub. To install a skill from this repository:

1. Navigate to the desired `.md` skill file in this repository.
2. Copy the GitHub file URL from your browser's address bar (e.g., `https://github.com/.../blob/main/skills/skill-name.md`).
3. Open your Zed Editor.
4. Open the AI Assistant or Command Palette and navigate to **Agent Configuration > Skills > Create Skill**.
5. Paste the copied URL into the input field.
6. Zed will automatically fetch and populate the form. Save it to start using your new skill immediately.

---
*Built to enhance productivity in Zed Editor.*
