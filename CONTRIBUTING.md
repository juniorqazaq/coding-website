# Contributing to Tamasha Learning Platform

Thank you for your interest in contributing to Tamasha Learning Platform! We welcome contributions from the community to help make this platform better for developers.

## How to Contribute

### 1. Fork the Repository
Click the "Fork" button at the top right of this page to create a copy of the repository in your own GitHub account.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/tamasha-learning.git
cd tamasha-learning
```

### 3. Create a New Branch
Use an appropriate prefix for your branch name:
- `feature/` for new features (e.g., `feature/user-profiles`)
- `bugfix/` for bug fixes (e.g., `bugfix/login-error`)
- `docs/` for documentation changes
- `refactor/` for code refactoring

```bash
git checkout -b feature/amazing-new-feature
```

### 4. Make Your Changes
Ensure your code follows our [Code Style Rules](#code-style-rules).

### 5. Commit Your Changes
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages.

**Format:** `<type>(<scope>): <description>`

**Example types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests

### 6. Push to GitHub
```bash
git push origin feature/amazing-new-feature
```

### 7. Open a Pull Request
- Navigate to the original repository on GitHub.
- You should see a prompt to create a Pull Request from your new branch.
- Provide a clear description of your changes and why they are needed.
- Link any related issues using the `Fixes #123` syntax.

---

## Pull Request Process

1. **Review:** All Pull Requests will be reviewed by the maintainers. We may request changes or ask for clarification.
2. **Quality Assurance:** Ensure all existing tests pass and add new tests if applicable.
3. **Documentation:** Update the `README.md` or other relevant documentation if your changes introduce new features or change existing behavior.
4. **Merge:** Once approved, your PR will be merged into the `main` branch.

## Code Style Rules

- **TypeScript:** Use strict types where possible. Avoid `any`.
- **Naming:** 
  - Components: `PascalCase`
  - Functions/Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
- **React:** 
  - Use functional components and hooks.
  - Keep components small and focused on a single responsibility.
- **Styling:** Use Tailwind CSS for styling. Follow the existing utility class patterns.
- **Linting:** Ensure your code passes linting checks before submitting.

---

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
