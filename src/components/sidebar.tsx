import { Menu, Phone, Search, Table, TrendingUp } from "lucide-react";
export function Sidebar() {
  return (
    <div className=" w-20 h-full flex flex-col items-center gap-7 py-4">
      <button>
        <Menu size={24} />
      </button>
      <button>
        <Table className=" stroke-amber-400" size={24} />
      </button>
      <button>
        <Search size={24} />
      </button>
      <button>
        <TrendingUp size={24} />
      </button>
      <button>
        <Phone size={24} />
      </button>
    </div>
  );
}
