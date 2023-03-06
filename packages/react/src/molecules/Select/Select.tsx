import React, {
  KeyboardEvent,
  PropsWithChildren,
  ReactNode,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Text from "../../atoms/Text/Text";
import { KeyboardKeys } from "@winoo/foundation";

interface RenderOptionProps<T extends Object> {
  isSelected: boolean;
  isHighlighted: boolean;
  item: T;
  classes: string;
}

interface SelectProps<T extends Object> {
  onSelect?: (options: T, optionIndex: number) => void;
  options: T[];
  keyExtractor?: (value: T) => string;
  labelExtractor: (value: T) => string | number;
  label?: string;
  renderOption?: (props: RenderOptionProps<T>) => ReactNode;
}

const Select = <T extends Object>({
  onSelect,
  options,
  keyExtractor,
  labelExtractor,
  renderOption,
  label = "Please select option...",
}: PropsWithChildren<SelectProps<T>>): JSX.Element => {
  // State Management Of Select Option
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLUListElement>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  // For Toggle Option
  const _handleToggleOption = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) _onHighlightItem(0);
      return !prev;
    });
  }, []);

  // On Option Selected
  const _onOptionSelect = useCallback(
    (option: T, optionIndex: number) => {
      if (onSelect) {
        onSelect(option, optionIndex);
      }

      setIsOpen(false);
      setSelectedIndex(optionIndex);
    },
    [onSelect]
  );

  // Key Extractor for Each Keys to render optimize of react components
  const _keyExtractor = useCallback(
    (option: T) => {
      if (keyExtractor) {
        return keyExtractor(option);
      }
      // Default Key Extractor
      return `${Math.random()}`;
    },
    [keyExtractor]
  );

  // Label Extractor to Correct Label Text
  const _labelExtractor = useCallback(
    (option: T) => {
      if (labelExtractor) {
        return labelExtractor(option);
      }
      // Default Value Extractor
      return `Need Label Extractor`;
    },
    [labelExtractor]
  );

  // Handling Keydown to Show Option
  const _onButtonKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      const { SPACE, ENTER, DOWN_ARROW } = KeyboardKeys;

      if (SPACE === event.key) {
        setIsOpen((prev) => {
          if (!prev) _onHighlightItem(0);
          return !prev;
        });
        return;
      }

      const isIncludeKey = Object.values([ENTER, DOWN_ARROW]).some(
        (key) => key === event.key
      );

      if (isIncludeKey) {
        setIsOpen(true);
        _onHighlightItem(0);
      }
    },
    [KeyboardKeys]
  );

  // When User MouseEnter or Keydown for each item
  const _onHighlightItem = useCallback((optionIndex: number) => {
    setHighlightIndex(optionIndex);
    if (optionIndex === -1) return;

    const curRef = optionRefs[optionIndex];
    if (curRef && curRef.current) {
      curRef.current.focus();
    }
  }, []);

  const _getNextOptionIndex = useCallback((index: number, options: T[]) => {
    const nextIndex =
      index === -1 || index === options.length - 1 ? 0 : index + 1;
    return nextIndex;
  }, []);

  const _getPreviousOptionIndex = useCallback((index: number, options: T[]) => {
    const previousIndex =
      index === -1 || index === 0 ? options.length - 1 : index - 1;
    return previousIndex;
  }, []);

  // When User Keydown for each item
  const _onOptionKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (highlightIndex === -1) return;
      const { ESC } = KeyboardKeys;
      if (ESC === event.key) {
        setIsOpen(false);
        return;
      }

      const { DOWN_ARROW, UP_ARROW, ENTER } = KeyboardKeys;

      const isDownArrow = DOWN_ARROW === event.key;
      const isUpArrow = UP_ARROW === event.key;
      const isEnter = ENTER === event.key;
      if (isDownArrow) {
        _onHighlightItem(_getNextOptionIndex(highlightIndex, options));
      }

      if (isUpArrow) {
        _onHighlightItem(_getPreviousOptionIndex(highlightIndex, options));
      }

      if (isEnter) {
        _onOptionSelect(options[highlightIndex], highlightIndex);
      }
    },
    [
      options?.length,
      KeyboardKeys,
      highlightIndex,
      _onHighlightItem,
      _getNextOptionIndex,
      _getPreviousOptionIndex,
      _onOptionSelect,
    ]
  );

  // Selected Label
  const selectedLabel = useMemo<string | number>(() => {
    return selectedIndex === -1
      ? label
      : labelExtractor
      ? labelExtractor(options[selectedIndex])
      : "Needed LabelExtractor to show correct";
  }, [selectedIndex, label, labelExtractor]);

  // Caret Classes for open or close
  const caretClasses = useMemo<string>(() => {
    const classes = "wo-widht-xs wo-height-xs wo-select__caret ";
    return isOpen
      ? classes + "wo-select__caret--open"
      : classes + "wo-select__caret--close";
  }, [isOpen]);

  // Handling Offset Of Selector
  useEffect(() => {
    setOverlayTop(
      labelRef.current?.offsetHeight ? labelRef.current?.offsetHeight + 2 : 0
    );
  }, [labelRef.current?.offsetHeight]);

  // Controlling Each Option Ref
  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options?.length]);

  // When Open and Ref focused to highligh option
  useEffect(() => {
    if (highlightIndex !== -1 && isOpen) {
      const ref = optionRefs[highlightIndex];
      if (ref && ref.current) {
        ref.current?.focus();
      }
    }
  }, [isOpen, highlightIndex]);

  // Handling Mouse Away Click Listener
  useEffect(() => {
    // Target Error Handler
    function assertIsNode(e: EventTarget | null): asserts e is Node {
      if (!e || !("nodeType" in e)) {
        throw new Error(`Node expected in Select Component`);
      }
    }

    let handleClickOutside = ({ target }: MouseEvent) => {
      if (selectContainerRef?.current && target) {
        // In a utility library:
        assertIsNode(target);

        // Click Outside of List
        if (
          !selectContainerRef?.current?.contains(target) &&
          !listContainerRef?.current?.contains(target) &&
          isOpen
        ) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="wo-select" ref={selectContainerRef}>
      <button
        ref={labelRef}
        className="wo-select__label"
        onClick={_handleToggleOption}
        onKeyDown={_onButtonKeyDown}
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        data-testid="WinOoSelectorButton"
      >
        <Text>{selectedLabel}</Text>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={caretClasses}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="menu"
          ref={listContainerRef}
          aria-hidden={isOpen ? undefined : "false"}
          className="wo-select__overlay"
          style={{ top: overlayTop }}
        >
          {options?.map((option, optionIndex) => {
            const ref = optionRefs[optionIndex];
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightIndex === optionIndex;
            // Render Options can read from parent scope with the function called renderOption
            const renderOptionProps = {
              item: option,
              isSelected,
              isHighlighted,
              classes: `wo-select__option 
                ${isSelected ? "wo-select__option--selected" : ""}
                ${isHighlighted ? "wo-select__option--highlighted" : ""}
              `,
            };

            // If user has used renderOption
            // We'll pass with the default classes
            // And Return User Component
            if (renderOption) {
              return (
                <li
                  role="menuitemradio"
                  ref={ref}
                  tabIndex={isHighlighted ? -1 : 0}
                  key={_keyExtractor(option)}
                  onClick={() => _onOptionSelect(option, optionIndex)}
                  onMouseEnter={() => _onHighlightItem(optionIndex)}
                  onMouseLeave={() => _onHighlightItem(-1)}
                  onKeyDown={(e) => _onOptionKeyDown(e)}
                >
                  {renderOption(renderOptionProps)}
                </li>
              );
            }

            // Else Our Default Selecter Style
            return (
              <li
                role="menuitemradio"
                ref={ref}
                tabIndex={isHighlighted ? -1 : 0}
                key={_keyExtractor(option)}
                onClick={() => _onOptionSelect(option, optionIndex)}
                onMouseEnter={() => _onHighlightItem(optionIndex)}
                onMouseLeave={() => _onHighlightItem(-1)}
                onKeyDown={(e) => _onOptionKeyDown(e)}
                className={renderOptionProps.classes}
              >
                <Text>{_labelExtractor(option)}</Text>
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="wo-widht-xs wo-height-xs"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
