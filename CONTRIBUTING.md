# Contributing to SerenityOS

Thank you for your interest in contributing! We welcome all contributions.

## Getting Started

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/serenityux.git
   cd serenityux
   ```
3. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes

### Code Style
- Use vanilla JavaScript (ES6+)
- Keep functions focused and single-purpose
- Add comments for complex logic
- Use meaningful variable and function names

### File Organization
- **index.html** - HTML structure only
- **script.js** - All JavaScript functionality
- **styles.css** - All styling

### Adding a New Feature

1. **New App**: Add a case to the `openWindow()` switch
2. **Styling**: Add CSS to `styles.css`
3. **Functionality**: Add handlers in `setupAppFunctionality()`

Example:
```javascript
case 'myapp':
    title = 'My App';
    content = `<div>...</div>`;
    break;
```

## Testing

1. Test locally: `npm run dev`
2. Visit `http://localhost:8000`
3. Test all features thoroughly
4. Check for console errors

## Submitting Changes

1. Commit your changes:
   ```bash
   git commit -m "Add: brief description of changes"
   ```
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request with:
   - Clear description of changes
   - Why the change is needed
   - How to test it

## Commit Message Guidelines

- Use imperative mood ("Add feature" not "Added feature")
- Start with action: Add, Fix, Update, Remove, Refactor
- Keep first line under 50 characters
- Add details in body if needed

Examples:
- `Add: dark mode toggle`
- `Fix: window dragging on mobile`
- `Update: calculator operations`

## Reporting Issues

When reporting bugs, include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## Code Review

- Be open to feedback
- Respond to comments constructively
- Make requested changes in new commits
- Ask questions if unclear

## Questions?

Feel free to open an issue for questions or discussions!

Thank you for contributing! 🎉
