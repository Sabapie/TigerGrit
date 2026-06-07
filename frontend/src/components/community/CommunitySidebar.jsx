import Button from '../ui/Button'
import Input from '../ui/Input'
import Avatar from '../ui/Avatar'
import ConvItem from './ConvItem'

export default function CommunitySidebar({
  tab,
  setTab,
  search,
  setSearch,
  filteredPrivateConvs,
  filteredGroups,
  filteredCommunities,
  filteredUsers,
  activeConv,
  setActiveConv,
  myUserId,
  openPrivateChat
}) {
  return (
    <aside className={`h-full shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300
      ${activeConv ? 'hidden md:flex md:w-72' : 'flex w-full md:w-72'}`}>
      <div className="flex border-b border-zinc-800">
        {[
          { key: 'users', label: 'Usuarios', icon: '👤' },
          { key: 'groups', label: 'Grupos', icon: '👥' },
          { key: 'communities', label: 'Comunidades', icon: '🌐' },
        ].map(t => (
          <Button
            key={t.key}
            variant="custom"
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-xs font-semibold transition flex flex-col items-center gap-0.5 duration-200 active:scale-95
              ${tab === t.key ? 'text-tigergrit border-b-2 border-tigergrit' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <span>{t.icon}</span>
            <span className="hidden sm:block">{t.label}</span>
          </Button>
        ))}
      </div>

      <div className="px-3 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar..."
            variant="plain"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1">
        {tab === 'users' && (
          <>
            {filteredPrivateConvs.length > 0 && (
              <>
                <p className="text-zinc-600 text-xs uppercase tracking-widest px-2 py-1">Chats</p>
                {filteredPrivateConvs.map(conv => (
                  <ConvItem
                    key={conv.id}
                    conv={conv}
                    active={activeConv?.id === conv.id}
                    onClick={() => setActiveConv(conv)}
                    myUserId={myUserId}
                  />
                ))}
                <p className="text-zinc-600 text-xs uppercase tracking-widest px-2 py-1 mt-2">Usuarios</p>
              </>
            )}
            {filteredUsers.map(user => (
              <div
                key={user.id}
                onClick={() => openPrivateChat(user.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-zinc-800 transition"
              >
                <Avatar name={user.name} size="md" />
                <div>
                  <p className="text-white text-sm font-semibold">{user.name}</p>
                  <p className="text-zinc-500 text-xs">{user.email}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'groups' && (
          filteredGroups.length > 0
            ? filteredGroups.map(conv => (
              <ConvItem
                key={conv.id}
                conv={conv}
                active={activeConv?.id === conv.id}
                onClick={() => setActiveConv(conv)}
                myUserId={myUserId}
              />
            ))
            : <p className="text-zinc-600 text-xs text-center mt-8">Sin grupos</p>
        )}

        {tab === 'communities' && (
          filteredCommunities.length > 0
            ? filteredCommunities.map(conv => (
              <ConvItem
                key={conv.id}
                conv={conv}
                active={activeConv?.id === conv.id}
                onClick={() => setActiveConv(conv)}
                myUserId={myUserId}
              />
            ))
            : <p className="text-zinc-600 text-xs text-center mt-8">Sin comunidades</p>
        )}
      </div>
    </aside>
  )
}
