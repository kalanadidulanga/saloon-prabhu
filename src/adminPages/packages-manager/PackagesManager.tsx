import { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import useAxios from "@/hooks/useAxios";
// import toast from "react-hot-toast";
interface Service {
  id: string;
  name: string;
  price: number;
}

interface Package {
  id: string;
  name: string;
  services: Service[];
}

interface Category {
  id: string;
  name: string;
  packages: Package[];
}

const PackagesManager: React.FC = () => {
  // const { fetch, loading } = useAxios();

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'HAIR',
      packages: [
        {
          id: '1',
          name: 'HAIR CUT',
          services: [
            { id: '1', name: 'Cut & Re-Style (Advance)', price: 4000 },
            { id: '2', name: 'Fringe Cut', price: 1000 },
            { id: '3', name: 'Trim', price: 1400 },
          ]
        },
        {
          id: '2',
          name: 'HAIR CUT | STYLE | MASSAGE',
          services: [
            { id: '4', name: 'Gents Hair Cut With Head Wash', price: 1400 },
            { id: '5', name: 'Gents Hair Setting', price: 2000 },
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'SKIN',
      packages: []
    },
    {
      id: '3',
      name: 'NAIL',
      packages: []
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const addCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: String(categories.length + 1),
          name: newCategoryName.toUpperCase(),
          packages: []
        }
      ]);
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [newPackageName, setNewPackageName] = useState('');

  const addPackage = () => {
    if (newPackageName.trim()) {
      setCategories(categories.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            packages: [
              ...category.packages,
              {
                id: String(category.packages.length + 1),
                name: newPackageName,
                services: []
              }
            ]
          };
        }
        return category;
      }));
      setNewPackageName('');
      setIsAddingPackage(false);
    }
  };

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const addService = () => {
    if (newService.name.trim() && newService.price) {
      setCategories(categories.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            packages: category.packages.map(pkg => {
              if (pkg.id === selectedPackage) {
                return {
                  ...pkg,
                  services: [
                    ...pkg.services,
                    {
                      id: String(pkg.services.length + 1),
                      name: newService.name,
                      price: Number(newService.price)
                    }
                  ]
                };
              }
              return pkg;
            })
          };
        }
        return category;
      }));
      setNewService({ name: '', price: '' });
      setIsAddingService(false);
    }
  };

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Salon Services Management
            </CardTitle>
            <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button onClick={addCategory}>Add Category</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className=" mr-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className=""
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {category.name} Packages
                    </h3>
                    <Dialog
                      open={isAddingPackage}
                      onOpenChange={setIsAddingPackage}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <PlusCircle className="w-4 h-4" />
                          Add Package
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Package</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <Input
                            placeholder="Package Name"
                            value={newPackageName}
                            onChange={(e) => setNewPackageName(e.target.value)}
                          />
                          <Button onClick={addPackage}>Add Package</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.packages.map((pkg) => (
                      <Card key={pkg.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{pkg.name}</CardTitle>
                            <Dialog
                              open={
                                isAddingService && selectedPackage === pkg.id
                              }
                              onOpenChange={(open) => {
                                setIsAddingService(open);
                                setSelectedPackage(pkg.id);
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <PlusCircle className="w-4 h-4 mr-2" />
                                  Add Service
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add New Service</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-4">
                                  <Input
                                    placeholder="Service Name"
                                    value={newService.name}
                                    onChange={(e) =>
                                      setNewService({
                                        ...newService,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                  <Input
                                    type="number"
                                    placeholder="Price"
                                    value={newService.price}
                                    onChange={(e) =>
                                      setNewService({
                                        ...newService,
                                        price: e.target.value,
                                      })
                                    }
                                  />
                                  <Button onClick={addService}>
                                    Add Service
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {pkg.services.map((service) => (
                              <div
                                key={service.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                              >
                                <span>{service.name}</span>
                                <div className="flex items-center gap-4">
                                  <span className="font-semibold">
                                    Rs. {service.price.toLocaleString()}
                                  </span>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackagesManager;
