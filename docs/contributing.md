---
layout: page
title: "Contributing"
nav_order: 4
---

# Contribution Guidelines

---

Thank you for considering contributing to the `proper-tags` package! Here's a comprehensive guide to help you through the process.

## Setup

1. **Fork the Repository**: Use the GitHub interface to fork this repository to your account.
2. **Clone the Fork**: On your local machine, open a terminal or command prompt. Use the following command to clone the forked repository:  
   `git clone https://github.com/hexagon/proper-tags.git`
3. **Navigate to the Repository**: Change to the project directory using:  
   `cd proper-tags`
4. **Install Dependencies**: To ensure you have all the required dependencies, run:  
   `npm ci`

## Working on Your Contribution

1. **Create a New Branch**: Always create a new branch for your work to ensure master remains clean. Use:  
   `git checkout -b feature/<feature-name>` or `git checkout -b bugfix/<bug-name>`
2. **Stay Updated**: Ensure you regularly pull the latest changes from the upstream repository to keep your fork up-to-date:  
   `git pull origin master`

## Tests

1. **Writing Tests**: Make sure you include tests that cover any new logic or features you add. A good test not only confirms the correct behavior but can also serve as documentation for how a certain feature works.
2. **Running Tests**: This project uses [AVA](https://github.com/sindresorhus/ava) for testing. To run tests, execute:  
   `npm test`
3. **Testing Convention**: The project is set up to search for test files in the `src` directory that have the `.test.js` extension.

## Code Style and Quality

1. **Coding Standards**: Adhere to the code style and patterns established in the project. This ensures consistency and readability across all contributions.
2. **Linting**: The project uses [Prettier](https://github.com/prettier/prettier) and [ESLint](https://github.com/eslint/eslint) to maintain a consistent code style. Before committing your changes, ensure your code adheres to the rules. Run:  
   `npm run lint`
3. **Auto-fixing Issues**: Some linting issues can be automatically fixed. Use the following command to attempt auto-fixes:  
   `npm run lint:fix`

## Committing and Pushing Changes

1. **Commit Messages**: Write clear and concise commit messages describing the changes you made.
2. **Atomic Commits**: Make sure each commit contains related changes. Avoid bundling unrelated changes into a single commit.
3. **Push Your Changes**: Once you're ready to submit your changes, push the branch to your forked repository:  
   `git push origin feature/<feature-name>`

## Submitting a Pull Request

1. **Open a Pull Request**: Navigate to the GitHub page of your forked repository and click on the "New pull request" button.
2. **Describe Your Changes**: In the pull request description, provide a detailed explanation of the changes you've made. If your PR is fixing a bug, provide steps to reproduce the bug.
3. **Wait for Review**: Maintainers of the `proper-tags` package will review your pull request. Address any feedback or changes requested.

## Final Notes

- Please ensure your code doesn't introduce any regressions by running the full test suite before submitting a PR.
- Always reference relevant issues or discussions in your pull requests.
- Contributions aren't just about code! If you find a typo, a confusing piece of documentation, or have ideas for improving the project structure, we'd love to hear from you.

Thank you for helping improve `proper-tags`!
```