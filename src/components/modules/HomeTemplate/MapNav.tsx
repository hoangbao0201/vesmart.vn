const MapNav = () => {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.3828530087208!2d108.20662828836059!3d16.045610647988134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142194a4da17273%3A0x90da618d63baeaf6!2zVkVTTUFSVCAtIFRydW5nIHTDom0gc-G7rWEgY2jhu69hIHJvYm90IGjDunQgYuG7pWkgdsOgIHRoaeG6v3QgYuG7iyBTbWFydCBIb21l!5e0!3m2!1svi!2s!4v1774927403558!5m2!1svi!2s";

    return (
        <section className="pt-8 mb-8">
            <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-800">Bản đồ</h2>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={'https://maps.app.goo.gl/i4ytMYC3rUJ8X1CQ8'}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    Mở Google Map
                </a>
            </div>

            <div className="overflow-hidden border border-slate-200 bg-white">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vị trí trên Google Map"></iframe>
            </div>
        </section>
    )
}

export default MapNav;