# Contributing to OSApps

Thank you for your interest in contributing to OSApps! We welcome contributions from the community.

## How to Contribute

### Adding New Open Source Apps

The easiest way to contribute is by adding new open source applications to our catalog:

1. Fork the repository
2. Edit `data/apps.json`
3. Add your app following this format:

```json
{
  "id": "unique-app-id",
  "name": "App Name",
  "description": "A brief description of what the app does",
  "category": "category-name",
  "url": "https://github.com/username/repo",
  "rating": "4.5",
  "license": "MIT",
  "downloads": "1M+"
}
```

**Valid categories:**
- `development` - Programming tools and IDEs
- `productivity` - Office and workflow tools
- `graphics` - Design and graphics applications
- `media` - Audio, video, and media tools
- `utilities` - System utilities and tools
- `games` - Games and gaming tools
- `education` - Learning and educational software
- `system` - System administration and infrastructure

4. Make sure the app is genuinely open source (check the license)
5. Submit a pull request with a clear description

### Code Contributions

To contribute code:

1. Clone the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test your changes locally
5. Commit your changes: `git commit -am 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

## Development Setup

```bash
# Clone the repository
git clone https://github.com/mpets1/OSApps.git
cd OSApps

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Code Style

- Use consistent formatting (use Prettier if available)
- Write meaningful commit messages
- Add comments for complex logic
- Follow existing code patterns

## Pull Request Process

1. Ensure your PR has a clear title and description
2. Reference any related issues
3. Make sure all tests pass
4. Keep commits clean and atomic
5. Update documentation as needed

## Community Guidelines

- Be respectful and inclusive
- Constructive feedback only
- No spam or self-promotion
- Focus on open source software

## Questions?

Feel free to open an issue or reach out to the community. We're here to help!

---

Thank you for helping make OSApps better! 🎉
