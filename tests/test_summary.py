"""KI-Zusammenfassung: Eingaben für die KI."""

from types import SimpleNamespace

from custom_components.ambiframe.summary import SummaryService


def test_car_on_two_pages_counts_once():
    car = {"type": "car", "options": {"name": "Auto", "battery": "sensor.auto_akku"}}
    store = SimpleNamespace(config={"pages": [{"widgets": [car]}, {"widgets": [car]}]})
    hass = SimpleNamespace(states=SimpleNamespace(get=lambda _id: SimpleNamespace(state="75")))
    service = SummaryService.__new__(SummaryService)
    service.hass, service.store = hass, store
    assert service._car() == [{"name": "Auto", "akku_prozent": "75"}]
