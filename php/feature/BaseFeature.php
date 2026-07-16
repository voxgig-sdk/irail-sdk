<?php
declare(strict_types=1);

// Irail SDK base feature

class IrailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IrailContext $ctx, array $options): void {}
    public function PostConstruct(IrailContext $ctx): void {}
    public function PostConstructEntity(IrailContext $ctx): void {}
    public function SetData(IrailContext $ctx): void {}
    public function GetData(IrailContext $ctx): void {}
    public function GetMatch(IrailContext $ctx): void {}
    public function SetMatch(IrailContext $ctx): void {}
    public function PrePoint(IrailContext $ctx): void {}
    public function PreSpec(IrailContext $ctx): void {}
    public function PreRequest(IrailContext $ctx): void {}
    public function PreResponse(IrailContext $ctx): void {}
    public function PreResult(IrailContext $ctx): void {}
    public function PreDone(IrailContext $ctx): void {}
    public function PreUnexpected(IrailContext $ctx): void {}
}
